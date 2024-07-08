import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">{t('title')}</h1>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            {i18n.language === 'es' ? 'Español' : 'English'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
            <li>
              <a onClick={() => changeLanguage('en')} className="text-base-content">
                English
              </a>
            </li>
            <li>
              <a onClick={() => changeLanguage('es')} className="text-base-content">
                Español
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
