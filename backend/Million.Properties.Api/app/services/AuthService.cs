using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using BCrypt.Net;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Config;
using Million.Properties.Api.Domain.Entities;

namespace Million.Properties.Api.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        private readonly IOwnerRepository _ownerRepo;
        private readonly IMapper _mapper;
        private readonly JwtSettings _jwtSettings;

        public AuthService(IUserRepository userRepo, IOwnerRepository ownerRepo, IMapper mapper, IOptions<JwtSettings> jwtOptions)
        {
            _userRepo = userRepo;
            _ownerRepo = ownerRepo;
            _mapper = mapper;
            _jwtSettings = jwtOptions.Value;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterUserDto dto, CancellationToken ct = default)
        {
            var existing = await _userRepo.GetByEmailAsync(dto.Email, ct);
            if (existing != null) throw new InvalidOperationException("Email already registered.");

            var hashed = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var user = new User
            {
                Email = dto.Email,
                PasswordHash = hashed,
                FullName = dto.FullName,
                Photo = dto.Photo,
                Role = dto.Role
            };

            await _userRepo.CreateAsync(user, ct);

            if (dto.Role == "Owner" && user.Id != null)
            {
                var owner = new Owner
                    {
                        IdOwner = user.Id, 
                        Name = dto.FullName,
                        Address = "Sin dirección", 
                        Photo = dto.Photo,
                        Birthday = DateTime.UtcNow.AddYears(-30) 
                };
        
        await _ownerRepo.CreateAsync(owner, ct);
    }

            var token = GenerateJwtToken(user);
            return new AuthResponseDto
            {
                Token = token,
                User = _mapper.Map<UserDto>(user),
                ExpiresAt = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiresInMinutes)
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto, CancellationToken ct = default)
        {
            var user = await _userRepo.GetByEmailAsync(dto.Email, ct);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid credentials.");

            var token = GenerateJwtToken(user);
            return new AuthResponseDto
            {
                Token = token,
                User = _mapper.Map<UserDto>(user),
                ExpiresAt = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiresInMinutes)
            };
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id ?? string.Empty),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiresInMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
