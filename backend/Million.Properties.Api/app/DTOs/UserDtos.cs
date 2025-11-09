namespace Million.Properties.Api.Application.DTOs
{
    public class RegisterUserDto
    {
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string FullName { get; set; } = default!;
        public string? Photo { get; set; }
        public string Role { get; set; } = "Owner";
    }

    public class LoginDto
    {
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
    }

    public class UserDto
    {
        public string? Id { get; set; }
        public string Email { get; set; } = default!;
        public string FullName { get; set; } = default!;
        public string? Photo { get; set; }
        public string Role { get; set; } = default!;
    }

    public class AuthResponseDto
    {
        public string Token { get; set; } = default!;
        public UserDto User { get; set; } = default!;
        public DateTime ExpiresAt { get; set; }
    }
}
