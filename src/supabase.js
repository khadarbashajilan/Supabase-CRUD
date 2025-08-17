import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SB_URL;
const supabaseKey = import.meta.env.VITE_SB_API;
const supabase = createClient(supabaseUrl, supabaseKey);

const dataFetched = async () => {
  try {
    const { data, error } = await supabase
      .from("sales_deals")
      .select("name, value");

    if (error) {
      console.error(error);
      throw new Error("Failed to fetch data from Supabase");
    }

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { dataFetched, supabase };
