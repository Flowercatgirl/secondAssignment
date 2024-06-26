# What's the weather?

This is a weather app that helps users to check what the weather is like across the globe on a click of a button.

Find the live site [here]

[here]: https://flowercatgirl.github.io/secondAssignment/

![screenshot of site responsiveness](assets/images/responsiveness.jpg)

---

## Features

- Checks the temperature of the place that user inputs and displays it in Celsius

- Gets Humidity and displays it

- Gets a Wind Speed and displays it

- Gets such weather conditions like: Clouds, Clear, Rain, Drizzle, Mist; and displays it via Weather Icons while changing the color of a background

- Gets Sunrise and Sunset times, then Local Time of the place, and using them calculates Daytime or Nighttime and reflects it by changing background color and Weather Icons

- Displays 404 icon when there's no such place found

- Discards special characters, that were entered by a mistake, also any white spaces before and after user input

- Have Social Icons within a footer

---

## Technologies Used

### Languages Used

- HTML5, CSS and Javascript

### Frameworks, Libraries & Programs Used

-  Git - For version control.

- Github - To save and store the files for the website.

- Font Awesome - For the iconography on the website.

- [Favicon.io](https://favicon.io/) To create favicon.

- [OpenWeather](https://openweathermap.org/api) API to fetch weather data.

- Google Dev Tools - To troubleshoot and test features, solve issues with responsiveness and styling.

- Photoshop - To create, cut and compress images.

- [Tinypng](https://tinypng.com/) To compress images.

- [Am I Responsive?](http://ami.responsivedesign.is/) To show the website image on a range of devices.

- Google Chrome extensions:
   Responsive Image Linter - To optimise image sizing.
   Better ruler - To check the size of a whitespace in the gallery in order to fill it.

---

## Deployment & Local Development

### Deployment

Github Pages was used to deploy the live website. The instructions to achieve this are below:

- Log in (or sign up) to Github

- Find the repository for this project, firstAssignment

- Click on the Settings link

- Click on the Pages link in the left hand side navigation bar

- In the Source section, choose main from the drop down select branch menu. Select Root from the drop down select folder menu

- Click Save. Your live Github Pages site is now deployed at the URL shown

### Local Development

#### How to Fork

To fork the firstAssignment repository:

- Log in (or sign up) to Github

- Go to the repository for this project, Flowercatgirl/firstAssignment

- Click the Fork button in the top right corner.

#### How to Clone

To clone the repository:

- Log in (or sign up) to GitHub

- Go to the repository for this project, Flowercatgirl/firstAssignment

- Click on the code button, select whether you would like to clone with HTTPS, SSH or GitHub CLI and copy the link shown

- Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory

- Type 'git clone' into the terminal and then paste the link you copied. Press enter

___

## Testing

Testing was ongoing throughout the entire build of the website. I used mostly Chrome Developer Tools, but also Lighthouse report viewer at the end.

### W3C Validator

[CSS validation](assets/images/css_validation.jpg)

[HTML validation](assets/images/html_validation.jpg)

### JsHint

Please note: warnings for play.js were not relevant as ES6 is available. 

[JS validation](assets/images/js_validation.jpg)

### Solved Bugs

1. The error thrown:
Uncaught (in promise)
Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received - this error was solved by disabling Google Chrome Extension.

2. Special characters input was generating errors - I fixed it with regex implementation.

3. It was really hard to implement the daytime recognition, I was getting a lot of errors trying different code.

### Known Bugs

The only place that fetches the wrong info is Dublin.

### Full Testing

To fully test my website I performed the following testing using a number of browsers (Chrome, Safari, Mozilla Firefox, Duckduckgo) and devices ( Macbook Pro 16", iPhone 14 plus).

I also viewed both pages in Chrome developer tools to ensure they were responsive on all screen sizes.

#### Links

-  Test each link on each page. Each link worked as expected, and any links leading to external pages opened correctly in a seperate browser tab.

___