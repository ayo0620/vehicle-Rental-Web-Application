import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import { UilTimes } from '@iconscout/react-unicons';
import Chart from 'react-apexcharts';
import '../../../Styles/AdminPage/Card/Card.css';

interface CardProps {
    title: string
    color: {
        backGround: string;
        boxShadow: string;
    };
    barValue: number;
    value: string;
    png: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    series: {
        name: string;
        data: { x: string; y: number; }[];
    }[];
}

interface CompactCardProps {
    title: string;
    color: {
        backGround: string;
        boxShadow: string;
    };
    barValue: number;
    value: string;
    png: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface CompactCardProps extends Omit<CardProps, 'series'> { // Omit 'series' from CompactCardProps
    setExpanded: () => void;
}

const Card: React.FC<CardProps> = ({ title, color, value, png, series, barValue }) => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            {expanded ? (
                <ExpandedCard title={title} color={color} series={series} setExpanded={()=>setExpanded(false)}/>
            ) : (
                <motion.div
                    layout
                    initial={{ borderRadius: 10 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <CompactCard title={title} color={color} value={value} png={png} barValue={barValue} setExpanded={() => setExpanded(true)} />
                </motion.div>
            )}
        </div>
    );
}



// Compact Card
const CompactCard: React.FC<CompactCardProps> = ({ title, color, value, png, barValue, setExpanded}) => {
    const Png = png;

    // Maximum values for each parameter
    const maxValues = {
        "Total Listings": 100,
        "Total Revenue": 10000,
        "Total Bookings": 50 
    } as Record<string, number>;

    // Calculate the percentage based on the maximum value
    const percentage = (parseFloat(value) / maxValues[title]) * 100;

    return (
        <motion.div
            layout
            initial={{ borderRadius: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="CompactCard"
            style={{
                background: color.backGround,
                boxShadow: color.boxShadow
            }}
            onClick={setExpanded}
        >
            <div className="radialBar">
                <CircularProgressbar 
                value={percentage}
                text={`${percentage.toFixed(0)}%`}
                />
                <span>{title}</span>
            </div>
            <div className="detail">
                <Png />
                {title === "Total Listings" || title === "Total Bookings" ? (
                    <span>{value}</span>
                ) : (
                    <span>${value}</span>
                )}
                <span>Last 7 days</span>
            </div>
        </motion.div>
    );
}

// Expanded card
function ExpandedCard({ title, color, series, setExpanded }: { title: string, color: { backGround: string, boxShadow: string }, series: {name: string;
    data: { x: string; y: number; }[] }[] , setExpanded: () => void }) {
        
        const categories = series[0].data.map(d => d.x);

        const data = {
            options: {
                chart: {
                    type: "area" as "area",
                    height: "auto",
                },
        
                dropShadow: {
                    enabled: false,
                    enabledOnSeries: undefined,
                    top: 0,
                    left: 0,
                    blur: 3,
                    color:"#000",
                    opacity: 0.35,
                },
        
                fill: {
                    colors: ["#fff"],
                    type: "solid",
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "smooth" as "smooth",
                    colors:["white"],
                },
                tooltip: {
                    x: {
                        format: "dd/MM/yy",
                    },
                },
                grid: {
                    show: true,
                },
                xaxis: {
                    type: "datetime" as "datetime",
                    labels: {
                        formatter: function(_: any, timestamp: number) {
                            // Format the timestamp into a date string
                            return new Date(timestamp).toLocaleDateString();
                        }
                    },
                    
                    // categories: categories.map(date => new Date(date).toLocaleDateString('en-GB')), // Format categories to display only dates
                },
            },
    };

    const chartSeries = series.map(serie => ({
        name: serie.name,
        data: serie.data.map(d => ({ x: new Date(d.x).getTime(), y: d.y }))
    }));

    return (
        <motion.div 
        className="ExpandedCard"
        style={{
            background: color.backGround,
            boxShadow:color.boxShadow,
        }}
        >
            <div style={{alignSelf: 'flex-end', cursor: 'pointer', color: 'white'}}>
                <UilTimes onClick={setExpanded}
                
                />
            </div>
            <span>{title}</span>
            <div className="chartContainer">
                <Chart series={chartSeries} type='area' options={data.options}/>
            </div>
            <span>Last 7 days</span>
        </motion.div>
    );
}


export default Card;