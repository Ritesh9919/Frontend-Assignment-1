import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { toastConfig } from "./utils/index";

function App() {
  const [rules, setRules] = useState([
    {
      key: "age",
      output: {
        value: 0,
        operator: ">=",
        score: 0,
      },
    },
  ]);

  const [combinator, setCombinator] = useState("and");
  const [showOuput, setShowOutput] = useState(false);

  const handleConnectorChange = (e) => {
    setCombinator(e.target.value);
  };

  const handleAddRule = () => {
    setRules([
      ...rules,
      { key: "age", output: { value: 0, operator: ">=", score: 0 } },
    ]);
  };

  const handleDeleteRule = (index) => {
    if (rules.length == 1) {
      return toast.error("You can not delete first rule", toastConfig);
    }
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOutput(true);
  };

  const handleInputChange = (index, fields, value) => {
    const updatedRules = [...rules];
    if (fields === "key") {
      updatedRules[index][fields] = value;
    } else {
      updatedRules[index].output[fields] = value;
    }
    setRules(updatedRules);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="connector" className="mb-2 fw-bold">
            Combinator
          </label>
          <select
            id="connector"
            value={combinator}
            onChange={(e) => handleConnectorChange(e)}
            className="border border-secondary-subtle pt-2 pb-2 rounded"
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>
        </div>

        {rules.map((rule, index) => (
          <div
            className="row mb-3 d-flex justify-content-center align-items-center border border-secondary-subtle p-2 rounded "
            key={index}
          >
            <div className="col-12 mb-3 col-sm-3 d-flex flex-column">
              <label htmlFor="key" className="mb-2 fw-bold">
                Key Type
              </label>
              <select
                id="key"
                value={rule.key}
                onChange={(e) =>
                  handleInputChange(index, "key", e.target.value)
                }
                className="p-1 rounded border border-secondary-subtle"
              >
                <option disabled>Select Rule Type</option>
                <option value="age">Age</option>
                <option value="credit_score">Credit Score</option>
                <option value="account_balance">Account Balance</option>
              </select>
            </div>
            <div className="col-12 mb-3 col-sm-3 d-flex flex-column">
              <label htmlFor="operator" className="mb-2 fw-bold">
                Operator
              </label>
              <select
                id="operator"
                value={rule.output.operator}
                onChange={(e) =>
                  handleInputChange(index, "operator", e.target.value)
                }
                className="p-1 rounded border border-secondary-subtle"
              >
                <option disabled>Select Operator</option>
                <option value=">">{">"}</option>
                <option value="<">{"<"}</option>
                <option value=">=">{">="}</option>
                <option value="<=">{"<="}</option>
                <option value="=">{"="}</option>
              </select>
            </div>
            <div className="col-12 mb-3 col-sm-2 d-flex flex-column">
              <label htmlFor="value" className="mb-2 fw-bold">
                Value
              </label>
              <input
                id="value"
                type="number"
                value={rule.output.value}
                onChange={(e) =>
                  handleInputChange(index, "value", e.target.value)
                }
                className="p-1 rounded border border-secondary-subtle"
              />
            </div>

            <div className="col-12 mb-3 col-sm-2 d-flex flex-column">
              <label htmlFor="score" className="mb-2 fw-bold">
                Score
              </label>
              <input
                id="score"
                type="number"
                value={rule.output.score}
                onChange={(e) =>
                  handleInputChange(index, "score", e.target.value)
                }
                className="p-1 rounded border border-secondary-subtle"
              />
            </div>
            <div className="col-12 col-sm-2">
              <button className="btn btn-danger" onClick={handleDeleteRule}>
                Delete
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddRule}
          className="btn btn-primary me-2"
        >
          Add Rule
        </button>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>

      {showOuput && (
        <div className="mt-5 border border-secondary-subtle mx-auto rounded d-flex flex-column justify-content-center align-items-center bg-body-secondary w-100 w-sm-70 w-md-50">
          <h2 className="text-center mt-2 mb-3">Output</h2>
          <pre className="text-primary">
            {JSON.stringify({ rules: rules, combinator: combinator }, null, 3)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
