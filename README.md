# Build and Deploy a Full Stack MERN Dashboard App With CRUD, Auth, and Charts Using Refine
![Refine Dashboard](https://i.ibb.co/gjKf4yj/Frame-1000002438-1.png)

With modern material design, a fully functional dashboard, a property management page, and a users page - both connected to our database and a profile page that connects the two, this video is the updated full-stack MERN course you’ve all been waiting for.

Alongside building this application, you'll learn how to use the most in-demand technologies today:

1. Node.js, Express.js, MongoDB, and React.js that together form the powerful MERN stack
2. Material UI: The most popular UI Component Kit nowadays
3. TypeScript: Yep, you heard that right; we’ll be using TypeScript on this project! No previous typescript knowledge is required
4. You’ll learn how to transform a Figma design into a fully functioning website
5. You’ll also learn how to optimize images and store them on the cloud using Cloudinary
6. Provide a quick and easy way for your users to log in and register using Google ****Auth
7. And most importantly, you’ll learn how to build React-based CRUD applications incredibly quickly using refine.

Developed by [@adrianhajdin](https://github.com/adrianhajdin) ([JavaScript Mastery](https://www.youtube.com/@javascriptmastery)).
Launch your development career with project-based coaching - [JS Mastery Pro](https://www.jsmastery.pro)

📦client
 ┣ 📂.dist
 ┣ 📂public
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜refine-collapsed.svg
 ┃ ┗ 📜refine.svg
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜Group 1.svg
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┗ 📜OIP.jfif
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂agent
 ┃ ┃ ┃ ┗ 📜AgentCard.tsx
 ┃ ┃ ┣ 📂charts
 ┃ ┃ ┃ ┣ 📜chart.config.ts
 ┃ ┃ ┃ ┣ 📜chart.tsx
 ┃ ┃ ┃ ┣ 📜PieChart.tsx
 ┃ ┃ ┃ ┣ 📜PropertyReferrals.tsx
 ┃ ┃ ┃ ┗ 📜TotalRevenue.tsx
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜CustomButton.tsx
 ┃ ┃ ┃ ┣ 📜Form.tsx
 ┃ ┃ ┃ ┣ 📜Profile.tsx
 ┃ ┃ ┃ ┗ 📜PropertyCard.tsx
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┗ 📜TopAgent.tsx
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂sider
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂title
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂contexts
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂interfaces
 ┃ ┃ ┣ 📜agent.d.ts
 ┃ ┃ ┣ 📜common.d.ts
 ┃ ┃ ┣ 📜google.d.ts
 ┃ ┃ ┣ 📜home.d.ts
 ┃ ┃ ┣ 📜property.d.ts
 ┃ ┃ ┗ 📜theme.d.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜agent-profile.tsx
 ┃ ┃ ┣ 📜agent.tsx
 ┃ ┃ ┣ 📜all-properties.tsx
 ┃ ┃ ┣ 📜create-property.tsx
 ┃ ┃ ┣ 📜edit-property.tsx
 ┃ ┃ ┣ 📜home.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜login.tsx
 ┃ ┃ ┣ 📜my-profile.tsx
 ┃ ┃ ┗ 📜property-details.tsx
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜parse-jwt.ts
 ┃ ┃ ┗ 📜validateForm.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜meta.json
 ┃ ┣ 📜react-app-env.d.ts
 ┃ ┣ 📜reportWebVitals.ts
 ┃ ┗ 📜setupTests.ts
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜.npmrc
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.MD
 ┗ 📜tsconfig.json

📦server
 ┣ 📂controllers
 ┃ ┣ 📜datacalc.controller.js
 ┃ ┣ 📜metric.controller.js
 ┃ ┣ 📜property.controller.js
 ┃ ┗ 📜user.controller.js
 ┣ 📂mongodb
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜chart.js
 ┃ ┃ ┣ 📜metric.js
 ┃ ┃ ┣ 📜property.js
 ┃ ┃ ┗ 📜user.js
 ┃ ┗ 📜connect.js
 ┣ 📂routes
 ┃ ┣ 📜chart.routes.js
 ┃ ┣ 📜datacalc.routes.js
 ┃ ┣ 📜metric.routes.js
 ┃ ┣ 📜property.routes.js
 ┃ ┗ 📜user.routes.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜index.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜scheduler.js


 config chart

 // // Function to get the date N days ago in "YYYY-MM-DD" format
// const getDateNDaysAgo = (days: number) => {
//   const date = new Date();
//   date.setDate(date.getDate() - days);
//   return date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
// };
