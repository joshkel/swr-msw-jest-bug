import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
//const fetcher = (...args) => { console.log(args); throw new Error(args[0]); }

export const Hello = () => {
  const { control, watch } = useForm();
  const query = watch("query");
  useSWR(query ? "/example?" + query : undefined, fetcher);
  return (
    <Controller
      control={control}
      name="query"
      render={({ field: {value,...field} }) => <input {...field} value={value || ''} />}
    />
  );
};

