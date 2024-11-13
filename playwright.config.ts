import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  
  projects: [

    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'Chromium',
      use: { browserName: 'chromium',
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
       },
      dependencies: ['setup'],
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox',
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
       },
      dependencies: ['setup'],
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit',
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
       },
      dependencies: ['setup'],
    },
  ],
};

export default config;