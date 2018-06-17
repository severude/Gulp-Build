# Gulp-Build

Professional front end web developers need to be fast and productive. This means working quickly and efficiently to create sites that perform well. Implement a quick and efficient professional workflow using JavaScript, NPM and Node.

# Setup

npm install - Installs all the build process dependencies.

# Commands

gulp scripts - Concatenates, minifies, and copies all JavaScript files into a all.min.js file in the dist/scripts folder.  JavaScript source maps are also created.

gulp styles - Compiles SCSS files into CSS, concatenates, minifies and copies all CSS into a all.min.css file in the dist/styles folder.  CSS source maps are also created.

gulp images - Optimizes images and then copies them into the dist/content folder.

gulp clean - Deletes all files and folders within the dist folder.

gulp build - Runs the clean, scripts, styles, and images tasks.  Copies all project files to the dist folder.

gulp - Runs the build task and serves the project on a local web server.  Any changes to a SCSS file triggers the styles task and reloads the browser to display the new changes.
