import { EntryState, JobProps } from "../../types";


const Job = ({ job }: JobProps) => {
  const {
    position,
    company,
    salary,
    location,
    section,
    saveDate,
    applyDate,
    followDate,
    interest,
    job_id,
    username,
  } = job;


  return (
    <tr>
      <td><input value={position} onChange={(e) => {updateState('position', e.target.value)}} type='text' placeholder='Job Position'/></td>
      <td><input value={company} onChange={(e) => {updateState('company', e.target.value)}} type='text' placeholder='Company'/></td>
      <td><input value={salary} onChange={(e) => {updateState('salary', e.target.value)}} type='text' placeholder='Max Salary'/></td>
      <td><input value={location} onChange={(e) => {updateState('location', e.target.value)}} type='text' placeholder='Location'/></td>
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
        <button type='button' onClick={() => submitEntry('/newPost')} className='text-white bg-green-400 w-10 rounded-md'>ADD</button>
      </td>
    </tr>
  )
}

export default Job;