import Job from "./Job.tsx";

const JobContainer = () => {
    return (
        <table className='border-2 border-slate-400 p-2'>
            <thead>
                <tr>
                    <th><input type='checkbox'/></th>
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
                <Job />
                <Job />
                <Job />
                <Job />
                <tr>
                    <td><button type='submit' className='text-white bg-green-400 w-6'>+</button></td>
                    <td><input type='text' placeholder='Job Position'/></td>
                    <td><input type='text' placeholder='Company'/></td>
                    <td><input type='text' placeholder='Max Salary'/></td>
                    <td><input type='text' placeholder='Location'/></td>
                    <td>
                        <select name='status-dropdown'>
                            <option value='bookmark' selected>Bookmarked 📖</option>
                            <option value='applying'>Applying ✍</option>
                            <option value='applied'>Applied 🔥</option>
                            <option value='interviewing'>Interviewing 🤝</option>
                            <option value='offers'>Offers 🚀</option>
                            <option value='untracked'>Untracked ♻️</option>
                        </select>
                    </td>
                    <td><input type='date'/></td>
                    <td><input type='date'/></td>
                    <td><input type='date'/></td>
                    <td><input type='text' placeholder='Job Position'/></td>
                </tr>
            </tbody>
        </table>
    )
}

export default JobContainer;