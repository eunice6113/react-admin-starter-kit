/// <reference types="react-scripts" />

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test' | 'local';
		PUBLIC_URL: string;
		REACT_APP_TITLE: string;
		REACT_APP_API_URL: string;
		REACT_APP_MODE: string;
		REACT_APP_SSO_AUTH: string;
		REACT_APP_SSO_LOGOUT: string;
		REACT_APP_AUTH: string;
		REACT_APP_REDIRECT_URI: string;
		REACT_APP_FILE_UPLOAD_URL: string;
		REACT_APP_FILE_DOWNLOAD_URL: string;
		REACT_APP_FILE_ALL_DOWNLOAD_URL: string;
		REACT_APP_USER_URL: string;
		REACT_APP_ADMIN_URL: string;
		REACT_APP_SURVEY_URL:string;
		REACT_APP_ADMIN_KEY: string;
	}
}