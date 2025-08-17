import {  useActionState, useEffect } from "react";
import { supabase } from "./supabase";

const Form = ({ metrics }) => {
  // useActionState hook that manages form submission state
  // Takes three parameters:
  // 1. Async function to handle form submission
  // 2. Initial state (null in this case)
  // Returns:
  // - error: any error that occurred during submission
  // - submitAction: the action to bind to the form's action prop
  // - isPending: boolean indicating if the form is currently submitting
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      // This is an asynchronous function that handles form submission
      // It takes two parameters:
      // - previousState: the previous state value (null initially)
      // - formData: FormData object containing form values from the form
      // previousState: the previous state value (null initially)
      // formData: FormData object containing form values
      const newDeal = {
        // Create new deal object from form data
        // Get the name from the form data and assign it to the name property
        name: formData.get("name"),
        // Get the value from the form data and assign it to the value property
        value: formData.get("value"),
      };
      console.log(newDeal);

      // To add a new deal :
      // const {error} = await supabase
      // .from('sales_deals')
      // .insert([newDeal])
      // if (error) {
      //   console.error("Error adding a deal:", error.message);
      //   throw new Error("Failed to delete deal");
      // } else {
      //   console.log("Deal added successfully");
      // }
      
      // To update a deal
      const {error} = await supabase
      .from('sales_deals')
      .update({value: newDeal.value})
      .eq("name", newDeal.name)

      if (error) {
        console.error("Error adding a deal:", error.message);
        throw new Error("Failed to updated deal");
      } else {
        console.log("Deal updated successfully");
      }

      // To delete a deal :
      // const { error } = await supabase
      //   .from("sales_deals")
      //   .delete()
      //   .eq("name", newDeal.name) // first condition
      //   .eq("value", newDeal.value); // second condition

      // if (error) {
      //   console.error("Error deleting deal:", error.message);
      //   throw new Error("Failed to delete deal");
      // } else {
      //   console.log("Deal deleted successfully");
      // }
     
      return null;
    },

    // Initial state value
    null
  );

  useEffect(()=>{
    if(!isPending){
      console.log("Deal success");
    }
  },[isPending])

  return (
    <div className="add-form-container">
      <form
        aria-label="Add new sales deal"
        aria-describedby="form-description"
        action={submitAction}
      >
        <div id="form-description" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter
          the amount.
        </div>

        <label htmlFor="deal-name">
          Name:
          <select
            id="deal-name"
            name="name"
            defaultValue={metrics?.[0]?.name || ""}
            aria-required="true"
          >
            {metrics.map((metric) => (
              <option key={metric.value} value={metric.name}>
                {metric.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="deal-value">
          Amount: $
          <input
            id="deal-value"
            type="number"
            name="value"
            defaultValue={0}
            max={8000}
            className="amount-input"
            min="0"
            step="10"
            aria-required="true"
            aria-label="Deal amount in dollars"
            aria-invalid={error ? "true" : "false"}
            disabled={isPending}
          />
        </label>

        <button type="submit" disabled={isPending} aria-busy={isPending}>
          Add Deal
        </button>
      </form>
    </div>
  );
};
export default Form;
