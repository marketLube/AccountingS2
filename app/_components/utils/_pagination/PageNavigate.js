"use client";
import React, { useEffect, useState } from "react";
import PagesNumbers from "./PagesNumbers";
import { useDispatch } from "react-redux";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { useKey } from "@/app/_hooks/useKey";
import { SlArrowLeft } from "react-icons/sl";
import { BsChevronRight } from "react-icons/bs";

function PageNavigate({
  style,
  btnStyle,
  currentPage,
  setCurrentPage,
  btnDisable = false,
}) {
  const dispatch = useDispatch();

  // Local states for startPage and endPage, specific to each component instance
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(4);

  // Effect to update pagination range when the current page changes
  useEffect(() => {
    const pageRange = 4; // Number of pages per range

    // Calculate startPage and endPage based on currentPage
    const newStartPage =
      Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const newEndPage = newStartPage + pageRange - 1;

    setStartPage(newStartPage);
    setEndPage(newEndPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      dispatch(setCurrentPage(newPage)); // Redux or local state management

      // Adjust page range when navigating to a different range
      if (newPage < startPage) {
        setStartPage(newPage - 3);
        setEndPage(newPage);
      }
    }
  };

  const handleNext = () => {
    // Adjust condition to work within current range
    if (currentPage <= endPage) {
      const newPage = currentPage + 1;
      dispatch(setCurrentPage(newPage)); // Redux or local state management

      // Adjust page range when navigating to the next range
      if (newPage > endPage) {
        setStartPage(newPage);
        setEndPage(newPage + 3);
      }
    }
  };

  useKey("ArrowRight", () => {
    handleNext();
  });
  useKey("ArrowLeft", () => {
    handlePrevious();
  });

  return (
    <div style={style} className="pagination">
      <button
        className={`button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        style={{
          ...btnStyle,
        }}
      >
        <span className="prev-icon-span">
          <SlArrowLeft color="gray" />
        </span>
      </button>
      <PagesNumbers
        currentPage={currentPage}
        startPage={startPage}
        endPage={endPage}
        onSetCurrentPage={setCurrentPage}
        btnDisable={btnDisable}
      />
      <button
        className={`button ${btnDisable ? "disabled" : ""}`}
        onClick={handleNext}
        disabled={btnDisable}
        style={{
          ...btnStyle,
        }}
      >
        <span className="next-icon-span">
          <BsChevronRight color="gray" />
        </span>
      </button>
    </div>
  );
}

export default PageNavigate;
