import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PropertyCard } from '@/features/properties/PropertyCard';
import { PropertyDto } from '@/types/property.types';
import propertiesReducer from '@/store/slices/propertiesSlice';

const mockProperty: PropertyDto = {
    idProperty: '1',
    name: 'Casa Moderna en El Poblado',
    address: 'Calle 10 # 45-20, El Poblado, Medellín',
    price: 350000000,
    codeInternal: 'PROP-001',
    year: 2020,
    description: 'Hermosa casa moderna con acabados de lujo',
    idOwner: 'owner1',
    imageUrl: 'https://example.com/image.jpg'
};

const renderWithStore = (property: PropertyDto) => {
    const store = configureStore({
        reducer: {
            properties: propertiesReducer
        }
    });
    return render(
        <Provider store={store}>
            <PropertyCard property={property} />
        </Provider>
    );
};

describe('PropertyCard', () => {
    it('renders property information correctly', () => {
        renderWithStore(mockProperty);
        expect(screen.getByText('Casa Moderna en El Poblado')).toBeInTheDocument();
    });
});