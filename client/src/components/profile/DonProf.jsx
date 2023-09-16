import axios from 'axios';
import React, { useEffect, useState } from 'react';
import APIRequests from '../../api';

// Custom card component
function CustomCard({ children }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg mb-4">
      {children}
    </div>
  );
}

export default function DonProf() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have a user object with email and userType
        const user = JSON.parse(localStorage.getItem('profile'));
        const userType = 'your_user_type'; // Replace with the actual user type

        const res = await APIRequests.getUser({ email: user.email, type: userType });

        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        } else {
          // Handle API error response here
          console.error("Error:", res.data.message);
          setLoading(false);
        }
      } catch (error) {
        // Handle network or unexpected errors here
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-200 py-5">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 lg:mr-10">
            <CustomCard>
              <div className="mb-4">
                <img
                  src={data.avatar || 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1694901264~exp=1694901864~hmac=d2e5e2e7551d00ab27b9e2b63b93c727fd2b22c21fb2b85b900db42b8d7267dc'}
                  alt="avatar"
                  className="rounded-full w-32 h-32 mx-auto lg:mx-0"
                />
                <p className="text-center text-xl font-bold mt-2">{data.name || 'Johnatan Smith'}</p>
                <div className="flex justify-center mb-2">
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 ml-2 hover:bg-blue-100 item-center justify-center">Message</button>
                </div>
              </div>
            </CustomCard>
          </div>

          <div className="lg:w-2/3">
            <CustomCard>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Full Name</span>
                  <span className="text-gray-500">{data.fullName || 'Johnatan Smith'}</span>
                </div>
                <hr />
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Email</span>
                  <span className="text-gray-500">{data.email || 'example@example.com'}</span>
                </div>
                <hr />
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Phone</span>
                  <span className="text-gray-500">{data.phone || '(097) 234-5678'}</span>
                </div>
                <hr />
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Mobile</span>
                  <span className="text-gray-500">{data.mobile || '(098) 765-4321'}</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-gray-600">Address</span>
                  <span className="text-gray-500">{data.address || 'Bay Area, San Francisco, CA'}</span>
                </div>
              </div>            
            </CustomCard>
          </div>
        </div>
      </div>
    </section>
  );
}
