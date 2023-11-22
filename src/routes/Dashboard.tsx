import useAuthenticate from '../Hooks/useAuthenticate.tsx';
import Navbar from '../components/Navbar.tsx';
import JobContainer from '../components/JobContainer.tsx';
import { useState, useEffect } from 'react';
import { DashProp } from '../../types.ts';
import '../App.css';
const Dashboard = ({ username }: DashProp) => {
  const [filter, setFilter] = useState('bookmarked');
  const [jobs, setJobs] = useState([]);
  // fetch jobs when Navbar filter has changed
  useEffect(() => {
    const endpoint = `/job?username=${username}&filter=${filter}`;
    const fetchData = async () => {
      const response = await fetch(endpoint);
      const newJobs = await response.json();
      setJobs(newJobs);
    };
    fetchData();
  }, [filter, username]);
  useAuthenticate();
  return (
    <div className='appContainer'>
      <Navbar setFilter={setFilter} />
      <JobContainer jobs={jobs} />
    </div>
  );
};

export default Dashboard;
