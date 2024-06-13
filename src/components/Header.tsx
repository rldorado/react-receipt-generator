import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">{t('title')}</h1>
      <div className="flex items-center">
        <div className="dropdown dropdown-end">
          <button role="button" className="btn btn-sm btn-ghost dropdown-toggle" tabIndex={0}>
            {i18n.language === 'es' ? 'Español' : 'English'}
          </button>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <button onClick={() => changeLanguage('en')} className="btn btn-ghost">
                English
              </button>
            </li>
            <li>
              <button onClick={() => changeLanguage('es')} className="btn btn-ghost">
                Español
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
