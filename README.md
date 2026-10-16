# Custom Bingo Maker

The goal of this project is to mimic bingo that uses events instead of numbers. The room is managed by an admin who is responsible for generating the events and mark them if said events occurred. Anyone can join the generated bingo room. Each player will be given a bingo board with randomised events, so everyone's experience will vary!

### Notes
Yes, there's only 1 admin because this is mainly for personal use.

## Prerequisites

Install [Git](https://git-scm.com/downloads) and [Nodejs](https://nodejs.org/en/download) (v24 LTS)

### Installation Notes
- **Windows:** The easiest way to run Nodejs on Windows is by downloading the "Windows Installer". Scroll down to see that option. 
- **macOS/Linux:** nvm is recommended.
- **AIX:** Good luck.

## Getting started
0. Open the terminal
1. Clone this repo:<br>
`git clone https://github.com/sukunnari/custom-bingo-maker.git `
2. Go to the newly created folder:<br>
`cd custom-bingo-maker`
3. Install the dependencies:<br>
`npm i`
4. Copy the **".env.sample"** file to **".env"**, then follow the instructions to fill in the empty variables
5. Initialise the database table:<br>
`npm run db:migrate`
6. Build the app:<br>
`npm run build`
7. Run the app:<br>
`npm run start`
