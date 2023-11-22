import { useState, useEffect } from "react";
import Job from "./Job.tsx";
import { EntryState, JobContainerProps, JobProps } from '../../types.ts'
import useSessionInfo from "../Hooks/useSessionInfo.tsx";

const JobContainer = ({ jobs }: JobContainerProps) => {
  const initialEntry: EntryState = {  
    position: '',
    company: '',
    salary: '',
    location: '',
    section: 'bookmark',
    saveDate: '',
    applyDate: '',
    followDate: '',
    interest: '',
  }

  const [ interest, setInterest ] = useState(Array(5).fill(false));
  const [ newEntry, setNewEntry ] = useState(initialEntry);
  useSessionInfo('newEntry', setNewEntry);

  useEffect(() => {
    setInterest(Array(5).fill(false).fill(true, 0, Number(newEntry.interest)))
  },[newEntry.interest]);

  const updateState = (category: keyof EntryState, value: string): void => {
    setNewEntry((prevState) => {
      const newState: EntryState = { ...prevState };
      newState[category] = value;
      sessionStorage.setItem('newEntry', JSON.stringify(newState));
      return newState;
    })
  }

  const updateInterest = (index: number) => {
    setInterest(Array(5).fill(false).fill(true, 0, index + 1))
    updateState('interest', `${index + 1}`)
  }

  const resetEntry = () => {
    sessionStorage.setItem('newEntry', JSON.stringify(initialEntry))
    setNewEntry(initialEntry)
  }

  const submitEntry = async (endPoint: string) => {
    const username = localStorage.getItem('username');
    try {
      const res = await fetch(endPoint, {
        method: 'POST',
        body: JSON.stringify({...newEntry, username: username}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('failed to post new job app')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <button onClick={resetEntry}>reset</button>
      <table className='border-2 border-slate-400 p-2'>
        <thead>
          <tr>
            <th>Job Position</th>
            <th>Company</th>
            <th>Max Salary</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date Saved</th>
            <th>Date Applied</th>
            <th>Follow up</th>
            <th>Interest Level</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => {
            return <Job job={job} key={index}/>
          })}
          <tr>
            <td><input value={newEntry.position} onChange={(e) => {updateState('position', e.target.value)}} type='text' placeholder='Job Position'/></td>
            <td><input value={newEntry.company} onChange={(e) => {updateState('company', e.target.value)}} type='text' placeholder='Company'/></td>
            <td><input value={newEntry.salary} onChange={(e) => {updateState('salary', e.target.value)}} type='text' placeholder='Max Salary'/></td>
            <td><input value={newEntry.location} onChange={(e) => {updateState('location', e.target.value)}} type='text' placeholder='Location'/></td>
            <td>
              <select onChange={(e) => {updateState('section', e.target.value)}} name='status-dropdown'>
                <option value='bookmark' selected={newEntry.section === 'bookmark'}>Bookmarked 📖</option>
                <option value='applying' selected={newEntry.section === 'applying'}>Applying ✍</option>
                <option value='applied' selected={newEntry.section === 'applied'}>Applied 🔥</option>
                <option value='interviewing' selected={newEntry.section === 'interviewing'}>Interviewing 🤝</option>
                <option value='offers' selected={newEntry.section === 'offers'}>Offers 🚀</option>
                <option value='untracked' selected={newEntry.section === 'untracked'}>Untracked ♻️</option>
              </select>
            </td>
            <td><input value={newEntry.saveDate} onChange={(e) => {updateState('saveDate', e.target.value)}} type='date'/></td>
            <td><input value={newEntry.applyDate} onChange={(e) => {updateState('applyDate', e.target.value)}} type='date'/></td>
            <td><input value={newEntry.followDate} onChange={(e) => {updateState('followDate', e.target.value)}} type='date'/></td>
            <td className='flex items-center space-x-2'>
              {interest.map((_, index) => {
                return <input type='radio' checked={interest[index]} onClick={() => updateInterest(index)}/>
              })}
            </td>
            <td>
              <button type='button' onClick={() => submitEntry('/job')} className='text-white bg-green-400 w-10 rounded-md'>ADD</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}

export default JobContainer;