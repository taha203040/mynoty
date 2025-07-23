import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect, useState } from "react";
type Note = {
  Subject: string;
  folder?: string;
  id: any;
};
export const Option1 = () => {
  return <article className="h-1/4 text-[#fcfcfc] ">Recent</article>;
};
