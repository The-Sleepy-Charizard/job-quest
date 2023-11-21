import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProp } from '../../types.ts';

const Login = ({ username, setUsername }: UserProp) => {
  const [ auth, setAuth ] = useState('login');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ infoMatch, setInfoMatch]  = useState('');
  const navigate = useNavigate();

  // makes sure passwords match
  useEffect(() => {
    confirmPassword.length > 0 && password !== confirmPassword
      ? setInfoMatch('passwords do not match')
      : setInfoMatch('');
  }, [confirmPassword, password]);

  // login or signup requested
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const loginEndpoint = `/user/${auth}`;

    if (password === confirmPassword || auth === 'login') {
      const res = await fetch(loginEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('failed to fetch at auth');
      }
      if (res.status === 201 || res.status === 202) {
        navigate('/dashboard');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
    case 'username':
      setUsername(e.target.value);
      break;
    case 'password':
      setPassword(e.target.value);
      break;
    case 'confirmPassword':
      setConfirmPassword(e.target.value);
      break;
    }
  }
  return (
    <div className='flex flex-col space-y-4 items-center'>
      <img className='w-2/4' src={`https://images-ext-1.discordapp.net/external/QySc1eXuDpXIA-Y5S3sG-eIgmN18OuQElpGdE8t5eFI/https/i.pinimg.com/originals/10/32/df/1032df35dd25347749e10e44453c9dde.gif`} />
      <main className='p-8 bg-yellow-500 border-2 border-yellow-500 rounded-lg'>
        <form
          className='space-y-3'
          onSubmit={handleSubmit}
        >
          <input
            className='bg-slate-100 rounded'
            type='username'
            name='username'
            placeholder='Username'
            autoComplete='off'
            onChange={handleInputChange}
          />
          <br />
          <input
            className='bg-slate-100 rounded'
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleInputChange}
          />
          <br />
          {auth === 'signup' && (
            <>
              <input
                className='bg-slate-100 rounded'
                type='password'
                name='confirmPassword'
                placeholder='Confirm password'
                onChange={handleInputChange}
              />
              <br />
              <dd role='infoMatch' className='text-rose-500 text-xs'>
                {infoMatch}
                <br />
              </dd>
            </>
          )}
          {auth === 'login' && (
            <button
              id='login'
              className='border-slate-500 border-1 rounded-lg bg-slate-200'
              type='submit'
            >
              Login
            </button>
          )}
          <button
            id='signup'
            className='border-slate-500 border-1 rounded-lg bg-slate-200'
            type={auth === 'login' ? 'button' : 'submit'}
            onClick={() => {
              setAuth('signup');
            }}
          >
            Signup
          </button>
        </form>
        {auth === 'signup' && (
          <a id='backtologin' href='#' onClick={() => setAuth('login')}>
            Or sign in
            <br />
          </a>
        )}
      </main>
    </div>
  );
};

export default Login;