# React_admin_panel

# Table of Contents
1. IntroductiProject setup and installation instructions.
2. Description of the project structure.
3. Explanation of implemented features.
4. Instructions for running the mock API.
5. Notes on design choices and any other relevant information.

1. Project setup and installation instructions.
- git clone https://github.com/kamyashah28/React_admin_panel.git
- cd React_admin_panel
- npm i --force
- npm run dev (for project run)
- json-server --watch db.json (for json server for user login, register)

2. Description of the project structure.
- node_modules -> install packages store in the node_modules
- public -> public folder consist backgroud images, fonts, icons, images, logo etc
- src -> src is the main project directory
    - _mock -> which stores the mock data which we can display only in frontend side without using server
    - assets -> it contains logo etc
    - components -> we can use for reusable ui components
    - hooks -> custom react hooks
    - layouts -> it contains layout of project like header, footer, main area, sidebar etc
    - locales -> language translation (i18n)
    - pages -> individual pages components
    - routes -> routing from whole project
    - sections -> seperate page section of the proeject
    - store -> state management of redux 
    - theme -> theme style configuration
    - utils -> functions, helpers, constants, utils etc.
    - app.css -> global page css
    - app.tsx -> main app configuration
    - config-global.ts -> global configuration file
    - index.css -> css 
    - main.tsx -> entry of the main react project
    - uuid.d.ts -> type declaration to avoid erroe
    - view-env.d.ts
    - .gitignore -> file ignore in git
    -  db.json -> json server to store data without backend sever
    - eslint.config.js -> configure file as eslint
    - index.html -> main html file of the project
    - package.json -> pacakge install and dependancy
    - README.md -> project documentation
    - tsconfig.app.json -> ts configuration to project
    - tsconfig.json -> ts configuration
    - tsconfig.node.json -> node js ts file
    - vite.config.ts -> vite configuration

3. Explanation of implemented features.
- Create a full-featured admin panel using React with Vite, Redux Toolkit, design tool of Material UI, implement internationalization with i18next, create utility functions, and perform CRUD operations with a mock API.

    1) Create an Admin Panel
        - Choose a design tool, such as Ant Design, Material UI, or Tailwind CSS.
        - Use React Vite Js and Redux Toolkit to manage data.
        - Implement i18next for internationalization.
        - Create utility functions, constants, and helpers as needed.

    2) Basic Admin Login, Register, and Forgot Password Pages
        - Create basic forms for Login, Register, and Forgot Password with validation.
        - Implement the required functionality for these forms (mock authentication).
    
    3) Navigation
        - Add a navigation bar with links to the Dashboard, Project, and Estimation modules.

        1. Dashboard Module
            - Implement the Dashboard using your best knowledge and experience.
            - Display relevant information and use appropriate charts or data displays.
        2. Project Module
            - Implement CRUD operations for projects.
            - Add filters for project listing.
            - Use mock API for data fetching and updating.
        3. Estimation Module
            - Implement CRUD operations for estimations.
            - Add filters for estimation listing.
            - Use mock API for data fetching and updating.

4. Instructions for running the mock API.
- Auth: 
    login, register
        - user add, update, delete using users data.
- _mock:
    display dashboard dummy static data display

5. Notes on design choices and any other relevant information.
- Design Tool : Material ui


git config --global user.name "Kamya Shah"
git config --global user.email "kamyashah2807@gmail.com"
