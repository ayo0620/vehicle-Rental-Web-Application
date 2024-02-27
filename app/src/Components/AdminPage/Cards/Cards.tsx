import React, { useState, useEffect } from "react";
import { RiCalendarCheckLine, RiMenu4Line, RiMoneyDollarCircleLine, RiTable2, RiTableLine } from 'react-icons/ri';
import { IconType } from "react-icons";
import Card from "../Card/Card";
import '../../../Styles/AdminPage/Cards/Cards.css';

interface CardProps {
    title: string;
    color: {
        backGround: string;
        boxShadow: string;
    };
    barValue: number;
    value: string;
    png: IconType;
    series: Series[];
}

interface ListingData {
    _id: string;
    count: number;
}

interface RevenueData {
    _id: string;
    total: number;
}

interface BookingData {
    _id: string;
    count: number;
}

type DataPoint = {
    _id: string;
    count: number;
    total?: number;
};

interface Series {
    name: string;
    data: { x: string; y: number }[];
}


const Cards: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [cardsData, setCardsData] = useState<CardProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                console.log('Token:', token);

                const totalListingsResponse = await fetch('http://localhost:5001/admin-dashboard/total-listings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const listingsData = await totalListingsResponse.json() as ListingData[];
                const processedListingsData = listingsData.map((item: ListingData) => ({ x: item._id, y: item.count }));

                const totalRevenueResponse = await fetch('http://localhost:5001/admin-dashboard/total-revenue', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                 });
        
                const revenueData = await totalRevenueResponse.json() as RevenueData[];
                const processedRevenueData = revenueData.map((item: RevenueData) => ({ x: item._id, y: item.total }));

                const totalBookingsResponse = await fetch('http://localhost:5001/admin-dashboard/total-bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                const bookingData = await totalBookingsResponse.json() as BookingData[];
                const processedBookingsData = bookingData.map((item: BookingData) => ({ x: item._id, y: item.count }));


                const totalListingsData: CardProps = {
                    title: "Total Listings",
                    color: {
                        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
                        boxShadow: "0px 10px 20px 0px #e0c6f5",
                    },
                    barValue: 70,
                    value: listingsData.length.toString(),
                    png: RiTable2,
                    series: [{ name: "Total Listings", data: processedListingsData }],

                };

                const totalRevenueData: CardProps = {
                    title: "Total Revenue",
                    color: {
                        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
                        boxShadow: "0px 10px 20px 0px #FDC0C7",
                    },
                    barValue: 80,
                    value: revenueData.reduce((sum, item) => sum + item.total, 0).toFixed(2).toString(),
                    png: RiMoneyDollarCircleLine, // Replace YourIconComponent with your icon component
                    series: [{ name: "Total Revenue", data: processedRevenueData }],

                };

                const totalBookingsData: CardProps = {
                    title: "Total Bookings",
                    color: {
                        backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                        boxShadow: "0px 10px 20px 0px #F9D59B",
                    },
                    barValue: 90,
                    value: bookingData.length.toString(),
                    png: RiCalendarCheckLine, // Replace YourIconComponent with your icon component
                    series: [{ name: "Total Bookings", data: processedBookingsData }],
                };

                setCardsData([totalListingsData, totalRevenueData, totalBookingsData]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Cards">
            {cardsData.map((card, index) => (
                <Card
                    key={index}
                    title={card.title}
                    color={card.color}
                    barValue={card.barValue}
                    value={card.value}
                    png={card.png}
                    series={card.series}
                />
            ))}
        </div>
    );
}

export default Cards;
