import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../../Styles/AdminPage/AddListingsForm/AddListingsForm.css';
import { FaArrowLeft } from 'react-icons/fa';

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  image: string;
  vehicleType: string;
  year: number;
  capacity: number;
  fuelType: string;
  rentPerHour: number;
  description: string;
}

interface IOption {
  label: string;
  value: string;
}

interface IMakes {
  [key: string]: IOption[];
}

// Mock function to get makes based on vehicle type
const getMakesByVehicleType = (vehicleType: string): IOption[] => {
  const makes: { [key: string]: IOption[] } = {
    'Car': [{ label: 'Toyota', value: 'Toyota' }, { label: 'Honda', value: 'Honda' }, { label: 'Ford', value: 'Ford' }, 
            { label: 'BMW', value: 'BMW'}, { label: 'Telsa', value: 'Telsa' }, { label: 'Volkswagen', value: 'Volkswagen' }, 
            { label: 'Subaru', value: 'Subaru' }, { label: 'Mercedes-Benz', value: 'Mercedes-Benz'}, { label: 'Chevrolet', value: 'Chevrolet'}],
    'Boat': [{ label: 'Yamaha', value: 'Yamaha' }, { label: 'Bayliner', value: 'Bayliner' }, { label: 'Boston Whaler', value: 'Boston Whaler' }, 
            { label: 'Grady-White', value: 'Grady-White' }, { label: 'Viking Yachts', value: 'Viking Yachts' }, { label: 'Sea Ray', value: 'Sea Ray' }, 
            { label: 'Chaparral', value: 'Chaparral' }, { label: 'Bertram', value: 'Bertram' }, { label: 'Cruisers Yachts', value: 'Cruisers Yachts' }],
    'Bicycle': [{ label: 'Trek', value: 'Trek' }, { label: 'Specialized', value: 'Specialized' }, { label: 'Cannondale', value: 'Cannondale' }, 
            { label: 'Santa Cruz', value: 'Santa Cruz' }, { label: 'Scott', value: 'Scott' }, { label: 'Giant Bicycles', value: 'Giant Bicycles' }, 
            { label: 'Rad Power Bikes', value: 'Rad Power Bikes' }, { label: 'Marin Bikes', value: 'Marin Bikes' }, { label: 'Lectric eBikes', value: 'Lectric eBikes' }],
    'Jet-ski': [{ label: 'Sea-Doo', value: 'Sea-Doo' }, { label: 'Kawasaki', value: 'Kawasaki' }, { label: 'Yamaha', value: 'Yamaha' }, 
            { label: 'Taiga', value: 'Taiga' }, { label: 'Belassi', value: 'Belassi' }, { label: 'WetJet', value: 'WetJet' }],
    'Motorcycle': [{ label: 'Honda', value: 'Honda' }, { label: 'Yamaha', value: 'Yamaha' }, { label: 'Ducati', value: 'Ducati' }, 
            { label: 'Kawasaki', value: 'Kawasaki' }, { label: 'Harley-Davidson', value: 'Harley-Davidson'}, { label: 'BMW', value: 'BMW' }, 
            { label: 'Suzuki', value: 'Suzuki' }, { label: 'Triumph', value: 'Triumph' }, { label: 'KTM', value: 'KTM' }],
    'Skateboard': [{ label: 'Baker Skateboards', value: 'Baker Skateboards' }, { label: 'Element Skateboards', value: 'Element Skateboards' }, { label: 'Creature Skateboards', value: 'Creature Skateboards' }, 
            { label: 'Girl Skateboards', value: 'Girl Skateboards' }, { label: 'Anti Hero Skateboards', value: 'Anti Hero Skateboards' }, { label: 'Santa Cruz Skateboards', value: 'Polar Skate Co.' }, 
            { label: 'Flip Skateboards', value: 'Flip Skateboards' }],
  };
  return makes[vehicleType] || [];
};


const AddVehicleForm: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // If we're editing, we'll have an ID
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [vehicleType, setVehicleType] = useState<string>('');
    const [make, setMake] = useState<string>('');
    const [makes, setMakes] = useState<IOption[]>([]);
    const [model, setModel] = useState<string>('');
    const [year, setYear] = useState<string>(''); 
    const [image, setImage] = useState<File | null>(null);
    const [capacity, setCapacity] = useState<string>(''); 
    const [fuelType, setFuelType] = useState<string>('');
    const [rentPerHour, setRentPerHour] = useState<string>(''); 
    const [description, setDescription] = useState<string>('');

    // Predefined options
    const vehicleTypes: IOption[] = [
      { label: 'Car', value: 'Car' },
      { label: 'Skateboard', value: 'Skateboard' },
      { label: 'Bicycle', value: 'Bicycle' },
      { label: 'Motorcycle', value: 'Motorcycle' },
      { label: 'Jet-ski', value: 'Jet-ski' },
      { label: 'Boat', value: 'Boat' },
    ];
    const fuelTypes: IOption[] = [
      { label: 'Gasoline', value: 'Gasoline' },
      { label: 'Diesel', value: 'Diesel' },
      { label: 'Electric', value: 'Electric' },
      { label: 'Hybrid', value: 'Hybrid' },
      { label: 'None (Human-powered)', value: 'None (Human-powered)' },
    ];

     // Event handlers
    const handleVehicleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedVehicleType = e.target.value;
      setVehicleType(selectedVehicleType);
      setMakes(getMakesByVehicleType(selectedVehicleType)); // Load makes for selected vehicle type
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImage(e.target.files[0]);
        // Create a preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
      // Convert the input value to a string
      const yearValue = e.target.value;
      setYear(yearValue);
    };

    const handleCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
      // Convert the input value to a number if it's not empty, otherwise set to undefined
      const capacityValue = e.target.value;
      setCapacity(capacityValue);
  };

  const handleBackClick = () => {
    window.history.back(); // This will take the user back to the previous page
  };

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchVehicleDetails(id);
    }
  }, [id]);

  const fetchVehicleDetails = async (vehicleId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/vehicles/${vehicleId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle details');
      }
      const data = await response.json();
      setVehicle(data);
      // Populate the form fields with fetched data
      setVehicleType(data.vehicleType);
      setMake(data.make);
      setModel(data.model);
      setYear(data.year.toString());
      setCapacity(data.capacity.toString());
      setFuelType(data.fuelType);
      setRentPerHour(data.rentPerHour.toString());
      setDescription(data.description);
      setImagePreview(data.image);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      
      try {
          const formData = new FormData();
          formData.append('vehicleType', vehicleType);
          formData.append('make', make);
          formData.append('model', model);
          formData.append('year', year?.toString() || '');
          if (image) {
              formData.append('image', image);
          }
          formData.append('capacity', capacity?.toString() || '');
          formData.append('fuelType', fuelType);
          formData.append('rentPerHour', rentPerHour?.toString() || '');
          formData.append('description', description);

          const token = localStorage.getItem('token');
          const endpoint = isEditing ? `/vehicles/${id}` : '/vehicles';
          const method = isEditing ? 'PATCH' : 'POST';

          const response = await fetch(endpoint, {
              method: method,
              body: formData,
              headers: {
                'Authorization': `Bearer ${token}`
              }
          });

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to add vehicle: ${errorMessage}`);
          }

          setVehicleType('');
          setMake('');
          setModel('');
          setYear('');
          setImage(null);
          setCapacity('');
          setFuelType('');
          setRentPerHour('');
          setDescription('');
          setImagePreview('')


          alert('Vehicle added successfully!');
      } catch (error) {
          console.error('Error adding vehicle:', error);
          alert('Failed to add vehicle. Please try again.');
      }
  };

    return (
      <div className="add-vehicle-container">
        <div className='header'>
          <FaArrowLeft className='back-button' onClick={handleBackClick}/>
          <h2>Add New Vehicle</h2>
        </div>
        <div className='form-container'>
          <div className="image-upload-container">
            <div className="image-preview">
                {imagePreview ? (
                    // Display the selected image
                    <img src={imagePreview} alt="Preview" className='vehicle-image'/>
                ) : (
                    <p>No image Selected</p>
                )}
            </div>
            <button className="upload-button" onClick={() => document.getElementById('image-upload')!.click()}>
                Upload Image
            </button>
            <input
                id="image-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                required
            />
          </div>
          <form className="vehicle-form" onSubmit={handleSubmit}>
              <select value={vehicleType} onChange={handleVehicleTypeChange} required>
                  <option value="">Select Vehicle Type</option>
                  {vehicleTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
              </select>
              <select value={make} onChange={(e) => setMake(e.target.value)} required>
                  <option value="">Select Make</option>
                  {makes.map((makeOption) => (
                      <option key={makeOption.value} value={makeOption.value}>{makeOption.label}</option>
                  ))}
              </select>
              <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
              <input type="text" placeholder="Year" value={year} onChange={handleYearChange} required />
              <input type="text" placeholder="Capacity" value={capacity || ''} onChange={handleCapacityChange} required />
              <select className="fuelType-select" value={fuelType} onChange={(e) => setFuelType(e.target.value)} required>
                  <option value="">Select Fuel Type</option>
                  {fuelTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
              </select>
              <input
                  type="text"
                  placeholder="Price Per Day"
                  value={rentPerHour}
                  onChange={(e) => setRentPerHour(e.target.value)}
                  pattern="^\d*(\.\d{0,2})?$"
                  required
              />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              <button type="submit" className='submit-button'>Add Vehicle</button>
          </form>
        </div>
    </div>
    );
};

export default AddVehicleForm;

