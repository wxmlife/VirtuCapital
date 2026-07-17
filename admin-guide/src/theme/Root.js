import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const STORAGE_KEY = 'virtu-admin-guide-authenticated';
const ADMIN_PASSCODE = '8888';

export default function Root({children}) {
  const {i18n} = useDocusaurusContext();
  const logoUrl = useBaseUrl('/img/logo.png');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const copies = {
    'zh-Hans': {
      title: '管理员手册',
      description: '请输入管理员权限口令后继续查看。',
      label: '管理员权限口令',
      placeholder: '请输入口令',
      error: '口令不正确，请重新输入。',
      submit: '进入管理员手册'
    },
    'zh-Hant': {
      title: '管理員手冊',
      description: '請輸入管理員權限口令後繼續檢視。',
      label: '管理員權限口令',
      placeholder: '請輸入口令',
      error: '口令不正確，請重新輸入。',
      submit: '進入管理員手冊'
    },
    en: {
      title: 'Admin Guide',
      description: 'Enter the admin passcode to continue.',
      label: 'Admin passcode',
      placeholder: 'Enter passcode',
      error: 'Incorrect passcode. Please try again.',
      submit: 'Open Admin Guide'
    }
  };
  const copy = copies[i18n.currentLocale] ?? copies['zh-Hans'];

  useEffect(() => {
    setIsAuthenticated(window.localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      window.localStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setError('');
      return;
    }

    setError(copy.error);
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-auth-page">
        <form className="admin-auth-card" onSubmit={handleSubmit}>
          <img src={logoUrl} alt="Virtu Capital" />
          <p className="admin-auth-kicker">Virtu Capital</p>
          <h1>{copy.title}</h1>
          <p className="admin-auth-copy">{copy.description}</p>
          <label htmlFor="admin-passcode">{copy.label}</label>
          <input
            id="admin-passcode"
            autoFocus
            type="password"
            autoComplete="current-password"
            inputMode="numeric"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            placeholder={copy.placeholder}
          />
          {error ? <p className="admin-auth-error">{error}</p> : null}
          <button type="submit">{copy.submit}</button>
        </form>
      </main>
    );
  }

  return children;
}
