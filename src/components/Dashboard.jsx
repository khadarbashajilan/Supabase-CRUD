import { useState, useEffect } from "react";
import { Chart } from "react-charts";
import { dataFetched, supabase } from "../supabase";
import Form from "./Form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  // State to store the fetched data
  const [sdata, setData] = useState([]);

  const {signOutUser} = useAuth()

  const navigate = useNavigate()

  // Function to fetch data from Supabase
  async function fetchData() {
    try {
      const data = await dataFetched();
      if (data) {
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Prepare chart data from the fetched data
  const chartData = sdata
    ? [
        {
          label: "Sales Deals",
          data: sdata.map((m) => ({
            primary: m.name,
            secondary: m.value || 0,
          })),
        },
      ]
    : [];

  // Configuration for the primary axis of the chart
  const primaryAxis = {
    getValue: (d) => d.primary,
    scaleType: "band",
    padding: 0.2,
    position: "bottom",
  };

  // Configuration for the secondary axis of the chart
  const secondaryAxes = [
    {
      getValue: (d) => d.secondary,
      scaleType: "linear",
      min: 0,
      max: 8000,
      padding: {
        top: 20,
        bottom: 40,
      },
    },
  ];

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel('deal-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'sales_deals'  
        },
        (payload) => {
          console.log(payload)
          // Action
          console.log(payload.new)
        })
      .subscribe();
    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <div className="flex  justify-around w-[100%]">

      <h1 className="text-red-500">Sales Deals</h1>
      <button className="border-2 cursor-pointer" onClick={()=>{signOutUser; navigate("/")}}>SignOut</button>
      </div>
      <div className="flex h-100 w-300">
        <Chart
          options={{
            data: chartData,
            primaryAxis,
            secondaryAxes,
            type: "bar",
            defaultColors: ["#58d675"],
            tooltip: {
              show: true,
            },
          }}
          style={{ width: "100%", height: "400px" }}
        />
      </div>
      <br />
      <br />
      {sdata && <Form metrics={sdata} />}
    </>
  );
}

export default Dashboard;
