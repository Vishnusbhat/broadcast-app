import "./mybroadcasts.css";
import { useView } from "../context/useView";
import { useState, useEffect } from "react";
import { db, collection, onSnapshot, query, where, orderBy } from "../firebase";
import { createdBefore } from "../utils/formatDate";

const MyBroadcasts = () => {
  const { userName, verificationThreshold } = useView();
  const [broadcasts, setBroadcasts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "broadcasts"),
      orderBy("createdAt", "desc"),
      where("createdBy", "==", userName)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setBroadcasts(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsub();
  }, [userName]);
  return (
    <div className="my-broadcasts-container">
      <div className="my-broadcasts-heading-container">
        <div className="my-broadcasts-text">
          <div className="my-broadcasts-name">
            Hello {userName}!
            <div className="my-broadcasts-profile-container">
              <div className="my-broadcasts-profile"></div>
            </div>
          </div>
          <span className="my-broadcasts-label">Your Active Broadcasts</span>
        </div>
      </div>
      <div className="mb-broadcast-container">
        {broadcasts.length !== 0 ? (
          <div className="mb-active-broadcasts">
            {broadcasts.map((broadcast, index) => {
              return (
                <div className="mb-broadcast" key={index}>
                  {broadcast.verified?.length <= verificationThreshold && (
                    <div className="mb-verified-label">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.864 0.504c-0.277 0.109 -0.437 0.223 -0.644 0.449 -0.246 0.269 -0.441 0.644 -0.695 1.331C5.259 3.006 5.13 3.245 4.978 3.287c-0.062 0.02 -0.457 0.051 -0.871 0.07 -0.414 0.023 -0.89 0.066 -1.054 0.101 -0.777 0.16 -1.257 0.593 -1.398 1.269 -0.094 0.441 -0.043 0.828 0.238 1.792 0.07 0.246 0.141 0.551 0.156 0.675 0.027 0.223 0.027 0.23 -0.102 0.367C1.874 7.637 1.597 7.871 1.327 8.082c-0.644 0.5 -0.984 0.863 -1.167 1.245 -0.133 0.277 -0.141 0.32 -0.141 0.668s0.008 0.39 0.141 0.668c0.183 0.383 0.523 0.746 1.167 1.246 0.269 0.211 0.547 0.445 0.621 0.519 0.125 0.133 0.129 0.144 0.102 0.359 -0.016 0.125 -0.105 0.496 -0.199 0.828 -0.094 0.332 -0.191 0.761 -0.215 0.949 -0.133 1.035 0.387 1.757 1.421 1.968 0.168 0.035 0.64 0.078 1.054 0.102 0.414 0.02 0.804 0.051 0.867 0.07 0.152 0.043 0.281 0.281 0.547 1.003 0.375 1.015 0.679 1.46 1.183 1.706 0.215 0.109 0.312 0.133 0.582 0.144 0.539 0.02 0.941 -0.137 1.741 -0.683 0.465 -0.32 0.839 -0.523 0.964 -0.523 0.125 0 0.5 0.203 0.964 0.523 0.808 0.551 1.21 0.707 1.749 0.679 0.266 -0.016 0.371 -0.039 0.578 -0.141 0.496 -0.246 0.808 -0.695 1.179 -1.706 0.266 -0.722 0.394 -0.96 0.547 -1.003 0.066 -0.02 0.457 -0.051 0.871 -0.07 0.414 -0.023 0.89 -0.066 1.054 -0.102 0.781 -0.16 1.253 -0.59 1.398 -1.269 0.094 -0.441 0.043 -0.828 -0.238 -1.792 -0.07 -0.246 -0.141 -0.551 -0.156 -0.675 -0.027 -0.226 -0.027 -0.23 0.121 -0.387 0.086 -0.082 0.32 -0.281 0.523 -0.433 0.203 -0.152 0.531 -0.437 0.73 -0.633 0.293 -0.293 0.387 -0.414 0.508 -0.668 0.141 -0.289 0.148 -0.332 0.148 -0.679s-0.008 -0.39 -0.141 -0.668c-0.184 -0.383 -0.523 -0.746 -1.167 -1.245 -0.269 -0.211 -0.547 -0.445 -0.621 -0.523l-0.137 -0.141 0.051 -0.312c0.023 -0.172 0.082 -0.41 0.121 -0.527 0.121 -0.347 0.266 -0.992 0.293 -1.288 0.066 -0.726 -0.273 -1.363 -0.882 -1.652 -0.355 -0.168 -0.746 -0.238 -1.605 -0.281 -0.414 -0.02 -0.804 -0.051 -0.871 -0.07 -0.152 -0.043 -0.281 -0.281 -0.547 -1.003 -0.375 -1.015 -0.679 -1.46 -1.183 -1.706C13.068 0.469 12.97 0.445 12.701 0.433c-0.539 -0.02 -0.941 0.137 -1.741 0.683C10.495 1.437 10.12 1.64 9.995 1.64 9.874 1.64 9.488 1.433 9.085 1.156c-0.523 -0.363 -0.796 -0.515 -1.132 -0.629 -0.367 -0.121 -0.808 -0.133 -1.089 -0.023m6.501 6.606c0.184 0.051 0.426 0.262 0.515 0.449s0.082 0.519 -0.016 0.703c-0.043 0.09 -1.007 1.078 -2.296 2.362 -2.104 2.097 -2.225 2.214 -2.405 2.257 -0.23 0.055 -0.426 0.027 -0.633 -0.094 -0.246 -0.144 -2.347 -2.272 -2.425 -2.46 -0.234 -0.558 0.152 -1.156 0.75 -1.156 0.347 0 0.472 0.09 1.324 0.941L8.96 10.893l1.874 -1.87c1.425 -1.417 1.905 -1.874 2.011 -1.905 0.183 -0.059 0.34 -0.059 0.519 -0.008"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="mb-company-name">
                    {broadcast.urgent && (
                      <div className="mb-urgent-label">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.627 1.757c-0.223 0.109 -2.807 2.706 -2.889 2.897 -0.148 0.363 -0.027 0.793 0.289 1.023 0.152 0.109 0.191 0.121 0.469 0.121 0.266 0 0.32 -0.012 0.457 -0.105 0.086 -0.059 0.746 -0.703 1.464 -1.425 1.433 -1.441 1.425 -1.429 1.394 -1.851 -0.02 -0.281 -0.176 -0.519 -0.426 -0.648 -0.215 -0.117 -0.539 -0.121 -0.757 -0.012"
                            fill="#fff6a6"
                          />
                          <path
                            d="M14.598 1.769c-0.258 0.137 -0.398 0.363 -0.418 0.672 -0.012 0.195 0 0.285 0.066 0.418 0.055 0.117 0.508 0.593 1.437 1.519 1.484 1.476 1.468 1.464 1.886 1.433 0.41 -0.031 0.703 -0.324 0.734 -0.734 0.031 -0.418 0.043 -0.402 -1.433 -1.886 -0.878 -0.882 -1.406 -1.382 -1.507 -1.433 -0.226 -0.109 -0.543 -0.105 -0.765 0.012"
                            fill="#fff6a6"
                          />
                          <path
                            d="M9.527 3.342c-3.03 0.215 -5.626 2.19 -6.61 5.037C2.104 10.717 2.503 13.294 3.986 15.305c0.328 0.449 1.183 1.288 1.624 1.601 1.858 1.308 4.111 1.73 6.282 1.171 2.721 -0.703 4.884 -2.975 5.439 -5.724 0.64 -3.166 -0.742 -6.298 -3.526 -7.977C13.048 3.92 12.006 3.549 11.116 3.42c-0.426 -0.062 -1.238 -0.102 -1.589 -0.078m1.62 1.773C13.072 5.517 14.692 6.864 15.395 8.648c0.328 0.828 0.441 1.503 0.406 2.436 -0.055 1.499 -0.617 2.776 -1.706 3.869 -1.757 1.765 -4.463 2.206 -6.692 1.089 -1.613 -0.812 -2.714 -2.233 -3.116 -4.021 -0.078 -0.351 -0.09 -0.511 -0.09 -1.187 0 -0.609 0.016 -0.855 0.07 -1.113 0.266 -1.218 0.757 -2.14 1.609 -2.987 0.968 -0.968 2.058 -1.511 3.416 -1.698 0.414 -0.059 1.409 -0.016 1.855 0.078"
                            fill="#fff6a6"
                          />
                          <path
                            d="M9.714 6.493c-0.355 0.102 -0.66 0.426 -0.734 0.789 -0.027 0.137 -0.039 0.8 -0.031 1.995 0.012 1.734 0.016 1.796 0.094 1.968 0.102 0.211 0.289 0.406 0.5 0.519 0.226 0.117 0.679 0.117 0.906 0 0.211 -0.113 0.398 -0.308 0.5 -0.519 0.082 -0.172 0.082 -0.219 0.082 -2.089v-1.913l-0.09 -0.183c-0.102 -0.203 -0.344 -0.441 -0.531 -0.519 -0.195 -0.082 -0.492 -0.101 -0.695 -0.047"
                            fill="#fff6a6"
                          />
                          <path
                            d="M9.523 13.033c-0.757 0.394 -0.746 1.448 0.02 1.855 0.226 0.117 0.679 0.117 0.906 0 0.453 -0.242 0.679 -0.738 0.547 -1.199 -0.141 -0.472 -0.519 -0.765 -1 -0.765 -0.215 0 -0.305 0.02 -0.472 0.109"
                            fill="#fff6a6"
                          />
                        </svg>
                      </div>
                    )}
                    {broadcast.company}
                    {/* sdfsjlkjalsdkfjlskdjflksjdflksjflksjlfdkjslkdfjlsk */}
                  </div>

                  <div className="mb-label">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 14 14"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.6563 3.13754V5.92817L3.46255 5.96567C2.30317 6.19067 1.2438 7.01567 0.715672 8.10317C0.131297 9.30942 0.237547 10.8 0.984422 11.925C2.0563 13.5313 4.13442 14.1063 5.8938 13.2844C6.18755 13.1469 6.54067 12.9125 6.7688 12.7063L6.9313 12.5625H10.2938H13.6563V7.99067V3.42192L12.1157 1.88129L10.5782 0.343793H7.11567H3.6563V3.13754ZM11.3375 2.66567L12.5625 3.89379V7.66567V11.4375H10.1532C7.87192 11.4375 7.7438 11.4344 7.76567 11.3844C8.05005 10.6782 8.14692 10.1032 8.09067 9.45317C8.04692 8.95004 7.94067 8.55317 7.7313 8.10942C7.2188 7.02192 6.13755 6.17504 4.9813 5.96254L4.7813 5.92817V3.68129V1.43754H7.44692H10.1094L11.3375 2.66567ZM4.84067 7.07817C5.35317 7.20004 5.7813 7.44067 6.17192 7.82817C6.7188 8.37817 6.97817 8.99379 6.97817 9.76567C6.97817 10.1969 6.92817 10.4719 6.7813 10.825C6.41567 11.7 5.65005 12.3219 4.7188 12.5C4.47192 12.5469 3.92505 12.5438 3.67192 12.4907C2.59067 12.2657 1.73442 11.4094 1.51255 10.3313C1.4438 10.0094 1.45317 9.46254 1.5313 9.13442C1.60942 8.79379 1.81567 8.36879 2.04067 8.07817C2.4563 7.53754 3.16255 7.12817 3.85005 7.03129C4.10005 6.99692 4.5813 7.01879 4.84067 7.07817Z"
                        fill="white"
                      />
                      <path
                        d="M3.65625 8.65625V9.21875H3.10938H2.5625V9.78125V10.3437H3.10938H3.65625V10.8906V11.4375H4.21875H4.78125V10.8906V10.3437H5.34375H5.90625V9.78125V9.21875H5.34375H4.78125V8.65625V8.09375H4.21875H3.65625V8.65625Z"
                        fill="white"
                      />
                    </svg>

                    {broadcast.label}
                  </div>
                  <div className="mb-counts">
                    <div className="mb-corrections">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 670 670"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M492.667 2.13336C472.667 4.66669 444.933 15.4667 427.467 27.2C422.933 30.2667 414.667 36.9334 408.933 41.8667L398.667 50.9334L384.667 48.4C365.867 45.0667 324.4 43.7334 304.533 46C248.133 52.1334 195.6 74 151.867 109.467C92.6667 157.333 54.4 227.733 46 304.533C43.7333 324.4 45.0667 365.867 48.4 384.667L50.9333 398.667L42 408.8C30.2667 422.133 23.0667 432.8 16 447.733C-14.4 511.067 1.73334 586.8 55.4667 632.4C108.8 677.867 186 682.267 243.867 642.933C248.267 640 256.267 633.6 261.867 628.667L272 619.733L286 622.267C304.8 625.6 346.267 626.933 366.133 624.667C400.533 620.933 432.533 611.6 463.067 596.667C553.333 552.4 613.6 466.4 624.667 366.133C626.933 346.267 625.6 304.8 622.267 286L619.733 272L628.8 261.733C640.8 248.133 647.733 237.6 654.8 222.8C699.733 127.6 639.6 17.0667 534.667 2.00002C523.733 0.533355 505.067 0.533355 492.667 2.13336ZM546.8 20.5334C561.2 24.1334 579.2 32 591.467 40C604.133 48.4 622.267 66.6667 630.667 79.3334C667.467 135.333 659.6 209.2 611.867 256C565.867 301.2 496.133 308.933 440.667 275.2C425.467 265.867 404.8 245.2 395.467 230C370.667 189.333 367.733 140.667 387.467 98.2667C407.067 56 445.2 26.6667 491.067 18.5334C505.067 16.1334 532.667 17.0667 546.8 20.5334ZM361.733 98.8C367.733 99.4667 368.8 100 368.133 101.733C364.133 113.6 360.4 130.267 359.2 141.733C355.733 174 364.267 209.867 382.267 239.2C391.867 254.8 415.867 278.8 431.467 288.4C471.2 312.8 518.933 318.667 562 304.533C566.533 303.067 570.533 302.133 570.8 302.4C571.2 302.667 571.867 310.133 572.533 318.8C579.733 415.6 526 507.733 437.333 550.133C401.2 567.467 358.933 575.467 319.333 572.667C310.933 572 303.467 571.467 302.8 571.467C302.267 571.333 302 570.267 302.4 568.933C316 525.6 315.333 491.867 300.133 454.4C292.267 435.2 283.067 421.733 266 404.667C238.4 377.067 209.733 363.467 170.8 359.333C150.267 357.067 118.4 361.067 104 367.6C102.133 368.4 100.267 368.8 99.8667 368.4C98.1334 366.533 96.9334 336 98.1334 319.467C104.133 232.533 155.467 157.333 234.267 120C273.467 101.467 316.933 94.2667 361.733 98.8ZM128.267 474.267L156.667 502.533L185.067 474.267C214.8 444.667 216.667 443.333 222 448.667C227.333 454 226 455.867 196.4 485.6L168.133 514L196.4 542.4C225.867 572 227.333 574.133 222.4 579.6C217.333 585.2 214.8 583.467 185.067 553.733L156.667 525.333L128.267 553.733C98.6667 583.333 96 585.2 90.8 579.867C85.4667 574.667 87.3334 572 116.933 542.4L145.333 514L116.933 485.6C87.4667 456.133 85.8667 453.867 90.9334 448.4C95.8667 442.8 98.4 444.533 128.267 474.267Z"
                          fill="white"
                        />
                        <path
                          d="M529.333 144.667C500.667 173.2 476.933 196.667 476.533 196.667C476.267 196.667 470.267 182.8 463.333 165.867C449.733 132.8 447.6 129.6 441.2 132.4C433.733 135.867 434 137.2 450.4 176.667C458.8 196.933 466.267 214.8 467.2 216.4C468.267 218.533 470 219.333 473.067 219.333C476.933 219.333 482.933 213.733 534.933 161.733C576.933 119.733 592.667 103.2 592.667 101.067C592.667 97.2 588.133 92.6667 584.4 92.6667C582.267 92.6667 566.533 107.467 529.333 144.667Z"
                          fill="white"
                        />
                      </svg>
                      0
                    </div>

                    <div className="mb-verifications">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.6 1.952C3.186 2.061 2.87 2.245 2.557 2.557c-0.316 0.316 -0.496 0.629 -0.605 1.058C1.874 3.908 1.874 4.068 1.874 9.995S1.874 16.082 1.952 16.375c0.043 0.168 0.133 0.41 0.203 0.543 0.184 0.344 0.609 0.757 0.96 0.933 0.554 0.281 0.332 0.269 5.337 0.258L12.943 18.097l0.262 -0.09c0.543 -0.183 1.062 -0.633 1.32 -1.136 0.195 -0.39 0.242 -0.605 0.262 -1.253l0.023 -0.605 0.219 -0.129c0.125 -0.07 0.359 -0.246 0.527 -0.387l0.305 -0.254 0.672 0.664c0.718 0.714 0.781 0.754 1.105 0.691 0.191 -0.035 0.426 -0.269 0.461 -0.461 0.062 -0.328 0.027 -0.383 -0.75 -1.163l-0.722 -0.726 0.137 -0.269c0.757 -1.503 0.679 -3.241 -0.215 -4.693 -0.269 -0.441 -1.019 -1.203 -1.445 -1.468l-0.297 -0.187 -0.016 -1.433c-0.02 -1.558 -0.023 -1.593 -0.266 -2.077 -0.258 -0.504 -0.777 -0.953 -1.32 -1.136L12.943 1.894 8.414 1.886c-4.357 -0.008 -4.541 -0.004 -4.814 0.066m9.347 1.277c0.211 0.113 0.398 0.308 0.5 0.519 0.078 0.164 0.082 0.25 0.094 1.285l0.012 1.105 -0.148 -0.023c-0.082 -0.012 -0.406 -0.035 -0.718 -0.047 -0.445 -0.02 -0.66 -0.012 -0.968 0.039 -2.038 0.344 -3.612 1.929 -3.955 3.982 -0.074 0.449 -0.055 1.23 0.043 1.702C8.195 13.661 9.671 15.133 11.537 15.52c0.582 0.117 1.425 0.117 1.929 -0.008l0.094 -0.023 -0.023 0.293c-0.012 0.16 -0.051 0.359 -0.086 0.445 -0.078 0.187 -0.301 0.426 -0.508 0.535l-0.156 0.086h-8.902l-0.211 -0.117c-0.242 -0.133 -0.449 -0.387 -0.508 -0.633 -0.031 -0.113 -0.043 -2.058 -0.043 -6.114 0 -6.743 -0.023 -6.22 0.316 -6.551 0.336 -0.324 -0.031 -0.305 4.935 -0.297l4.412 0.008zM13.165 7.356c0.644 0.125 1.238 0.429 1.718 0.878 0.535 0.5 0.882 1.093 1.054 1.784 0.113 0.472 0.113 1.191 0 1.624 -0.16 0.601 -0.367 1.003 -0.742 1.46 -0.422 0.515 -1.148 0.972 -1.823 1.156 -0.449 0.121 -1.312 0.117 -1.757 -0.004 -1.085 -0.297 -1.983 -1.081 -2.401 -2.104 -0.367 -0.902 -0.328 -2.007 0.098 -2.862 0.508 -1.011 1.398 -1.706 2.479 -1.929 0.34 -0.07 1.019 -0.07 1.374 -0.004"
                          fill="white"
                        />
                        <path
                          d="M4.791 5.247c-0.191 0.07 -0.25 0.125 -0.347 0.312 -0.144 0.285 -0.051 0.597 0.242 0.793l0.129 0.09h2.261c1.921 0 2.276 -0.008 2.374 -0.059 0.242 -0.125 0.387 -0.449 0.316 -0.714 -0.051 -0.18 -0.254 -0.387 -0.437 -0.437 -0.078 -0.023 -0.976 -0.039 -2.261 -0.039 -1.679 0.004 -2.159 0.016 -2.276 0.055"
                          fill="white"
                        />
                        <path
                          d="M4.791 7.746c-0.191 0.07 -0.25 0.125 -0.347 0.312 -0.144 0.285 -0.051 0.597 0.242 0.793 0.125 0.086 0.156 0.09 1.14 0.09 0.816 0 1.035 -0.012 1.124 -0.059 0.242 -0.125 0.387 -0.449 0.316 -0.714 -0.051 -0.18 -0.254 -0.387 -0.437 -0.437 -0.207 -0.062 -1.858 -0.047 -2.038 0.016"
                          fill="white"
                        />
                        <path
                          d="M4.791 10.245c-0.191 0.07 -0.25 0.125 -0.347 0.312 -0.144 0.285 -0.051 0.597 0.242 0.793 0.121 0.082 0.172 0.09 0.711 0.09 0.461 0 0.613 -0.016 0.718 -0.062 0.195 -0.094 0.301 -0.265 0.32 -0.519 0.02 -0.273 -0.086 -0.449 -0.344 -0.582 -0.152 -0.074 -0.23 -0.086 -0.664 -0.086 -0.305 0.004 -0.543 0.023 -0.636 0.055"
                          fill="white"
                        />
                        <path
                          d="M13.919 9.425c-0.062 0.027 -0.539 0.371 -1.05 0.757L11.936 10.889l-0.406 -0.308c-0.449 -0.344 -0.629 -0.418 -0.867 -0.351 -0.203 0.055 -0.418 0.293 -0.453 0.504 -0.02 0.129 -0.008 0.199 0.066 0.347 0.074 0.152 0.195 0.262 0.746 0.679 0.722 0.547 0.851 0.601 1.132 0.484 0.078 -0.031 0.675 -0.461 1.327 -0.957 1.269 -0.96 1.3 -0.988 1.292 -1.316 -0.004 -0.226 -0.121 -0.41 -0.328 -0.515 -0.195 -0.098 -0.355 -0.105 -0.527 -0.031"
                          fill="white"
                        />
                      </svg>
                      0
                    </div>
                  </div>
                  {/* <div className="mb-comments">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <path
                        width="512"
                        height="512"
                        fill="url(#pattern0_58_63)"
                        d="M0 0H24V24H0V0z"
                      />
                      <defs>
                        <pattern
                          id="pattern0_58_63"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlink:href="#image0_58_63"
                            transform="scale(.00195)"
                          />
                        </pattern>
                        <image
                          id="image0_58_63"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          xlink:href="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                  </div> */}
                  <div className="mb-createdate">
                    {createdBefore(broadcast.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mb-no-active-broadcasts">
            You have no active broadcasts at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBroadcasts;
