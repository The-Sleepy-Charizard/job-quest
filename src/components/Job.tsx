import { useState, useEffect } from "react";
import { JobProps } from "../../types";

const Job = ({ job, submitEntry, updateState }: JobProps) => {
  const [ jobState, setJobState ] = useState(job);
  const [ currInterest, setCurrInterest ] = useState(Array(5).fill(false));

  useEffect(() => {
    setCurrInterest(Array(5).fill(false).fill(true, 0, Number(jobState.interest)))
  },[jobState.interest]);

  return (
    <tr>
      <td>{jobState.position}</td>
      <td>{jobState.company}</td>
      <td>{jobState.salary}</td>
      <td>{jobState.location}</td>
      <td><input value={jobState.position} onChange={(e) => {updateState('position', e.target.value, setJobState)}} type='text' placeholder='Job Position'/></td>
      <td><input value={jobState.company} onChange={(e) => {updateState('company', e.target.value, setJobState)}} type='text' placeholder='Company'/></td>
      <td><input value={jobState.salary} onChange={(e) => {updateState('salary', e.target.value, setJobState)}} type='text' placeholder='Max Salary'/></td>
      <td><input value={jobState.location} onChange={(e) => {updateState('location', e.target.value, setJobState)}} type='text' placeholder='Location'/></td>      
      <td>
        <select onChange={(e) => {
          if (jobState.section !== e.target.value) {
            const body = {
              job_id: jobState.job_id,
              username: jobState.username,
              section: e.target.value
            }
            submitEntry('/job', body, 'PATCH');
          }
        }} name='status-dropdown'>
          <option value='bookmark' selected={jobState.section === 'bookmark'}>Bookmarked 📖</option>
          <option value='applying' selected={jobState.section === 'applying'}>Applying ✍</option>
          <option value='applied' selected={jobState.section === 'applied'}>Applied 🔥</option>
          <option value='interviewing' selected={jobState.section === 'interviewing'}>Interviewing 🤝</option>
          <option value='offers' selected={jobState.section === 'offers'}>Offers 🚀</option>
          <option value='untracked' selected={jobState.section === 'untracked'}>Untracked ♻️</option>
        </select>
      </td>
      <td><input value={jobState.saveDate} onChange={(e) => {
        if (jobState.saveDate !== e.target.value) {
          const body = {
            job_id: jobState.job_id,
            username: jobState.username,
            saveDate: e.target.value
          }
          submitEntry('/job', body, 'PATCH');
        }
      }} type='date'/></td>
      <td><input value={jobState.applyDate} onChange={(e) => {
        if (jobState.applyDate !== e.target.value) {
          const body = {
            job_id: jobState.job_id,
            username: jobState.username,
            applyDate: e.target.value
          }
          submitEntry('/job', body, 'PATCH');
        }
      }} type='date'/></td>
      <td><input value={jobState.followDate} onChange={(e) => {
        if (jobState.followDate !== e.target.value) {
          const body = {
            job_id: jobState.job_id,
            username: jobState.username,
            followDate: e.target.value
          }
          submitEntry('/job', body, 'PATCH');
        }
      }} type='date'/></td>
      <td className='flex items-center space-x-2'>
        {currInterest.map((_, index) => {
          return <input type='radio' checked={currInterest[index]} onClick={() =>{
            const value = index + 1
            if (Number(jobState.interest) !== value) {
              const body = {
                job_id: jobState.job_id,
                username: jobState.username,
                interest: value
              }
              submitEntry('/job', body, 'PATCH');
            }
            setCurrInterest(Array(5).fill(false).fill(true, 0, value))
          }}/>
        })}
      </td>
      <td>
        <button type='button' onClick={() => submitEntry('/job', jobState, 'PUT')} className='text-white bg-green-400 w-14 rounded-md'>EDIT</button>
      </td>
      <td>
        <button type='button' onClick={() => submitEntry('/job', { job_id: jobState.job_id }, 'DELETE')} className='text-white bg-red-400 w-10 rounded-md'>X</button>
      </td>
    </tr>
  )
}

export default Job;