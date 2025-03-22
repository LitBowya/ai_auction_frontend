"use client";

import React, {useState} from "react";
import Button from "@/components/Button";
import AuctionCard from "@/components/AuctionCard";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import HeaderTitle from "@/components/HeaderTitle";
import Error from "@/components/Error";


const Auctions = ({ active, upcoming, past }) => {
    // Pagination states for each section
    const [activePage, setActivePage] = useState(1);
    const [upcomingPage, setUpcomingPage] = useState(1);
    const [pastPage, setPastPage] = useState(1);

    // Pagination handler
    const handlePageChange = (type, newPage) => {
        if (type === "active") setActivePage(newPage);
        if (type === "upcoming") setUpcomingPage(newPage);
        if (type === "past") setPastPage(newPage);
    };

    return (
        <div className="relative">

            <div className={`max_width my-10`}>
                {/* Active Auctions */}
                <section>
                    <div className="text-end mb-8">
                        <HeaderTitle first='Active' second='Auctions' className='active-section' />
                        <p className="text-lg text-gray-600">
                            Explore Active Auctions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {active.data.length > 0 ? (
                            active.data.map((auction) => <AuctionCard key={auction._id} auction={auction} />)
                        ) : (
                            <div className="text-center">
                                <Error message="No active auctions" />
                            </div>
                        )}
                    </div>
                    {/* Pagination for Active */}
                    <div className="flex justify-end items-center mt-6 gap-2">
                        <Button icon={<IoIosArrowBack />} variant={`danger`} disabled={activePage <= 1} onClick={() => handlePageChange("active", activePage - 1)} />
                        <span className="text-md font-normal">Page {activePage} of {active.pagination.totalPages}</span>
                        <Button variant={`danger`} icon={<IoIosArrowForward />} disabled={activePage >= active.pagination.totalPages} onClick={() => handlePageChange("active", activePage + 1)} />
                    </div>
                </section>

                {/* Upcoming Auctions */}
                <section className="mt-12">
                    <div className="text-end mb-8">
                        <HeaderTitle first='Upcoming' second='Auctions' className='upcoming-section' />
                        <p className="text-lg text-gray-600">
                            Explore Upcoming Auctions
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {upcoming.data.length > 0 ? (
                            upcoming.data.map((auction) => <AuctionCard key={auction._id} auction={auction} />)
                        ) : (
                            <div className="text-center">
                                <Error message="No upcoming auctions" />
                            </div>
                        )}
                    </div>
                    {/* Pagination for Upcoming */}
                    <div className="flex justify-end items-center mt-6 gap-2">
                        <Button icon={<IoIosArrowBack />} variant={`danger`} disabled={upcomingPage <= 1} onClick={() => handlePageChange("upcoming", upcomingPage - 1)} />
                        <span className="text-md font-normal">Page {upcomingPage} of {upcoming.pagination.totalPages}</span>
                        <Button icon={<IoIosArrowForward />} variant={`danger`} disabled={upcomingPage >= upcoming.pagination.totalPages} onClick={() => handlePageChange("upcoming", upcomingPage + 1)} />
                    </div>
                </section>

                {/* Past Auctions */}
                <section className="mt-12">
                    <div className="text-end mb-8">
                        <HeaderTitle first='Past' second='Auctions' className='past-section' />
                        <p className="text-lg text-gray-600">
                            Explore Past Auctions
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {past.data.length > 0 ? (
                            past.data.map((auction) => <AuctionCard key={auction._id} auction={auction} />)
                        ) : (
                            <div className="text-center">
                                <Error message="No past auctions" />
                            </div>
                        )}
                    </div>
                    {/* Pagination for Past */}
                    <div className="flex justify-end items-center mt-6 gap-2">
                        <Button icon={<IoIosArrowBack />} variant={`danger`} disabled={pastPage <= 1} onClick={() => handlePageChange("past", pastPage - 1)} />
                        <span className="text-md font-normal">Page {pastPage} of {past.pagination.totalPages}</span>
                        <Button icon={<IoIosArrowForward />} variant={`danger`} disabled={pastPage >= past.pagination.totalPages} onClick={() => handlePageChange("past", pastPage + 1)} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Auctions;
