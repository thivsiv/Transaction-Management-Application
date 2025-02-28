
# Transaction Management Application

A web-based transaction management application built using Flask for the backend and React for the frontend. The app allows users to track, categorize, and manage their income and expenses, providing a summary and visual representation of financial transactions.

## Features

- **Add Transactions**: Add income or expense transactions with a description, date, and amount.
- **View Transactions**: View a list of all transactions with filtering options by type (income/expense) and month.
- **Delete Transactions**: Remove transactions from the database.
- **Visualize Data**: Generate a bar chart to compare income vs expenses per month.
- **Transaction Summary**: Display the total income, total expense, and net profit.

## Tech Stack

### Backend:
- **Flask** (Python)
- **SQLite** (Database)
- **CORS** (for handling cross-origin requests)

### Frontend:
- **React.js**
- **Tailwind CSS** (for styling)
- **Chart.js** (for visualizing data)

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/thivsiv/Transaction-Management-Application.git
```

### 2. Set Up Backend (Flask)
#### Install dependencies
Create a virtual environment and install the necessary Python packages:

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scriptsctivate`
pip install -r backend/requirements.txt
```

#### Set up the database
The `init_db` function in the Flask backend will automatically create the necessary database (`transactions.db`) and the transactions table on the first run.

```bash
# Navigate to the backend folder and run the app to initialize the database
cd backend
python app.py
```

This will automatically create the `transactions.db` SQLite database and the necessary tables.

### 3. Set Up Frontend (React)

#### Install dependencies
Navigate to the `frontend` folder and install the required Node.js packages:

```bash
cd frontend
npm install
```

#### Run the application
Start the React development server:

```bash
npm start
```

This will start the frontend on [http://localhost:5173](http://localhost:5173).

### 4. Run Flask Server
Run the Flask backend server:

```bash
cd backend
python main.py
```

This will start the backend server on [http://localhost:5000](http://localhost:5000).


