import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService } from "../services/storage.service";
import ApiService from "../services";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../contexts/UsersProvider";

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export function uuid() {
  return uuidv4();
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export function useTimer(
  duration,
  { onActive, onStopped, triggerFunc, autoStart = false }
) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(autoStart);
  const timer = useRef();

  useEffect(() => {
    setIsActive(autoStart);
    if (autoStart) {
      onActive && onActive({ isActive, timeLeft });
    }
  }, [autoStart]);

  useEffect(() => {
    if (isActive) {
      timer.current = setInterval(() => {
        const time_left = timeLeft - 1;
        setTimeLeft(time_left);
        if (time_left <= 0) {
          setIsActive(false);
          setTimeLeft(duration);
          onStopped && onStopped({ isActive, timeLeft });
        } else {
          triggerFunc && triggerFunc();
        }
      }, 1000);
    } else {
      if (timer.current !== undefined) {
        clearInterval(timer.current);
      }
    }

    return () => {
      if (timer.current !== undefined) {
        clearInterval(timer.current);
      }
    };
  }, [isActive, timeLeft]);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setTimeLeft(duration);
    onActive && onActive({ isActive, timeLeft });
  }, [isActive, onActive, timeLeft]);

  const stopTimer = useCallback(() => {
    setIsActive(false);
    onStopped && onStopped({ isActive, timeLeft });
  }, [isActive, onStopped, timeLeft]);

  const restartTimer = useCallback(() => {
    setTimeLeft(duration);
    setIsActive(true);
    onActive && onActive({ isActive, timeLeft });
  }, [duration, isActive, onActive, timeLeft]);

  return { isActive, timeLeft, startTimer, stopTimer, restartTimer };
}

export const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

export const useAuthorization = () => {
  ApiService.init(process.env.REACT_APP_BASE_URL);
  const token = storageService.getItem("token");
  if (token) {
    console.log("token", token);
    ApiService.setHeader(token);
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [token]);

  return null;
};
export const useAuthUser = () => {
  const localUser = JSON.parse(storageService.getItem("user"));
  const token = storageService.getItem("token");

  const { getUserById, user } = useUsersContext();

  useEffect(() => {
    getUserById(localUser?.id);
  }, [token]);

  return { user: user || localUser || token };
};
