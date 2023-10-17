import React, {useState} from "react";
import { Checkbox } from "@mui/material";
import {Slider} from "@mui/material";
import { Grid } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import '../../Styles/VehicleListingsPage/Sidebar.css';

interface Brand {
    name: string;
    logoUrl: string;
}

const Sidebar: React.FC = () => {
  const [vehicleTypeOpen, setVehicleTypeOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceRangeOpen, setPriceRangeOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleVehicleType = () => setVehicleTypeOpen(!vehicleTypeOpen);
  const toggleBrand = () => setBrandOpen(!brandOpen);
  const togglePriceRange = () => setPriceRangeOpen(!priceRangeOpen);

  const vehicleTypes = ['Car', 'Skateboards', 'Bicycles', 'Motorcycles', 'Jet Ski', 'Boat'];
  const brands: Brand[] = [
    { name: 'Toyota', logoUrl: 'https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_ogp_001.png'}, 
    { name: 'Honda', logoUrl: 'https://www.carlogos.org/car-logos/honda-logo.png'}, 
    { name: 'Ford', logoUrl: 'https://i.pinimg.com/1200x/31/15/8b/31158b7fd6b665dc137abf4d6700e3d6.jpg'}, 
    { name: 'Chevrolet', logoUrl: 'https://1000logos.net/wp-content/uploads/2019/12/Chevrolet-Logo-2010.png'},
    { name: 'BMW', logoUrl: 'https://cloud.starkinsider.com/wp-content/uploads/2020/03/1997-BMW-logo.webp'}, 
    { name: 'Mercedes', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1134px-Mercedes-Logo.svg.png'},
  ];
  const priceRangeMarks = [
    { value: 0, label: '$0' },
    { value: 5000, label: '$5000' },
    { value: 10000, label: '$10000' },
  ];

  const handleBrandClick = (brandName: string) => {
    setSelectedBrands((prevSelected) => {
        if (prevSelected.includes(brandName)){
            return prevSelected.filter((brand) => brand !== brandName);
        } else {
            return [...prevSelected, brandName];
        }
    })
  }


  return (
    <div className="sidebar">
      {/* Vehicle Type Section */}
      <div className="sidebar-section">
        <div className="section-header" onClick={toggleVehicleType}>
          Vehicle Type
          {vehicleTypeOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </div>
        {vehicleTypeOpen && (
          <div className="section-options">
            {vehicleTypes.map((type) => (
                <FormControlLabel
                    key={type}
                    control={<Checkbox/>}
                    label={type}
                />
            ))}
          </div>
        )}
      </div>

      {/* Brand Section */}
      <div className="sidebar-section">
        <div className="section-header" onClick={toggleBrand}>
          Brand
          {brandOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </div>
        {brandOpen && (
          <div className="section-options">
            <Grid container spacing={1}>
                {brands.map((brand) => (
                    <Grid item xs={4} key={brand.name}>
                        <img
                            src={brand.logoUrl}
                            width={30}
                            height={30}
                            onClick={() => handleBrandClick(brand.name)}
                            className={selectedBrands.includes(brand.name) ? 'selected-brand': ''}
                        />
                    </Grid>
                ))}
            </Grid>
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="sidebar-section">
        <div className="section-header" onClick={togglePriceRange}>
          Price Range
          {priceRangeOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </div>
        {priceRangeOpen && (
          <div className="section-options">
            <Slider
                defaultValue={[0, 20000]}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={50}
                marks={priceRangeMarks}            
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
