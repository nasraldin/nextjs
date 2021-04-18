import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import { formatTime, formatDuration } from "../util/utils";
import React, { useState } from "react";

export default function Flights(props) {
  let flights = {};
  let haveStops = false;

  if (props.loadFlights) {
    const { data, loading, error } = onSearch(props.searchQuery);

    if (loading) {
      return <h2>Loading...</h2>;
    }

    if (error) {
      console.error(error);
      return null;
    }

    flights = data.flights;
  }

  function itineraries(flight, checkStops) {
    let flighTime, operating, duration, flightFromTo, stops;

    for (let flightOffer of flight.itineraries) {
      duration = flightOffer.duration;
      flightOffer.segments.forEach((seg) => {
        flighTime = formatTime(seg.departure.at, seg.arrival.at);
        flightFromTo = `${seg.departure.iataCode}-${seg.arrival.iataCode}`;
        operating = seg.operating.carrierCode;
        if (seg.stops) {
          stops = seg.stops;
          haveStops = true;
        }
      });
    }

    return (
      <a key={flight.id} className={styles.card}>
        {!checkStops && (
          <div>
            <div className={styles.box_left}>
              <h3>{flighTime}</h3>
              <span>{operating}</span>
            </div>
            <div className={styles.box_right}>
              <h3>{formatDuration(duration)}</h3>
              <span>{flightFromTo}</span>
            </div>
          </div>
        )}
        {checkStops && stops !== null && (
          <div>
            <div className={styles.box_left}>
              <h3>{formatTime(stops.departureAt, stops.arrivalAt)}</h3>
              <span>{operating}</span>
            </div>
            <div className={styles.box_right}>
              <h3>1 stop</h3>
              <span>
                {formatDuration(stops.duration)} {stops.iataCode}
              </span>
            </div>
          </div>
        )}
      </a>
    );
  }

  return (
    <div className={styles.flightsWrp}>
      {/* {!this.loading && <p>Sorry, no results.</p>} */}

      {props.loadFlights && (
        <div>
          <div className={styles.flights}>
            <hr className={styles.hr} />
            <h2 className={styles.flights_header}>Best flights (non-stop)</h2>
            <div className={styles.grid}>
              {flights.map((flight) => {
                return itineraries(flight);
              })}
            </div>
          </div>
          {haveStops && (
            <div className={styles.flights}>
              <hr className={styles.hr} />
              <h2 className={styles.flights_header}>
                Other flights (1+ stops)
              </h2>
              <div className={styles.grid}>
                {flights.map((flight) => {
                  return itineraries(flight, true);
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Query(searchQuery) {
  return gql`
    query GetFlights {
      flights(
        originLocationCode: "${searchQuery.originLocationCode}"
        destinationLocationCode: "${searchQuery.destinationLocationCode}"
        departureDate: "${searchQuery.departureDate}"
        airline: "EK"
      ) {
        id
        itineraries {
          duration
          segments {
            departure {
              iataCode
              terminal
              at
            }
            arrival {
              iataCode
              terminal
              at
            }
            carrierCode
            number
            aircraft {
              code
            }
            operating {
              carrierCode
            }
            stops {
              arrivalAt
              departureAt
              duration
              iataCode
            }
          }
        }
      }
    }
  `;
}

export function onSearch(searchQuery) {
  if (
    searchQuery.originLocationCode &&
    searchQuery.destinationLocationCode &&
    searchQuery.departureDate
  ) {
    return useQuery(Query(searchQuery));
  } else {
    console.log("Plz enter fly details");
  }
}
