import 'primeflex/primeflex.css';
import './App.css';
import 'primereact/resources/themes/md-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { DataTableDynamicDemo } from './Demo';
/* import { FormikFormDemo } from './Demo2'; */

function App() {
  return (
    <div className="App">
      <DataTableDynamicDemo />
      {/* <h1>Таблица №2</h1>
      <FormikFormDemo /> */}
    </div>
  );
}
export default App;
