import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { FaVolumeUp, FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const EnglishToFrenchTranslator = () => {
  const [englishText, setEnglishText] = useState("");
  const [frenchText, setFrenchText] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); 
    } else {
      const { role } = JSON.parse(storedUser);
      if (role !== "employee") {
        navigate("/admin-dashboard"); 
      }
    }
  }, [navigate]);

  const handleTranslate = async () => {
    setError("");
    setFrenchText("");
    if (!englishText.trim()) {
      setError("Please enter text in English.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          englishText
        )}&langpair=en|fr`
      );
      const data = await response.json();
      const frenchTranslation = data.responseData.translatedText;

      setFrenchText(frenchTranslation);
    } catch (e) {
      setError("An error occurred during translation. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(frenchText);
    alert("French translation copied to clipboard!");
  };

  const handlePlayAudio = () => {
    if (!frenchText) {
      alert("Nothing to play. Please translate text first.");
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(frenchText);
    utterance.lang = "fr-FR";

    const setVoice = () => {
      const voices = synth.getVoices();
      const frenchVoice = voices.find((voice) => voice.lang === "fr-FR");

      if (frenchVoice) {
        utterance.voice = frenchVoice;
      } else {
        console.warn("No French voice found, using the default.");
      }

      synth.speak(utterance);
    };

    if (synth.getVoices().length > 0) {
      setVoice();
    } else {
      synth.addEventListener("voiceschanged", setVoice);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        sx={{
          // background: "white",
          // minHeight: "100vh",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // padding: 2,
          backgroundImage: `url('/mags.jpg')`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            // background: "#ffffff",
            // borderRadius: 4,
            // boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            // padding: 4,
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: 4,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            padding: 4,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              color: "#000000",
              mb: 4,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            English to French Translator
          </Typography>

          <Grid container spacing={4}>
            {/* Input Section */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "#f9f9f9",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: "#2575fc",
                  }}
                >
                  Enter English Text
                </Typography>
                <TextField
                  label="Type your text in English"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={englishText}
                  onChange={(e) => setEnglishText(e.target.value)}
                  error={Boolean(error)}
                  helperText={error || ""}
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <Box sx={{ mt: 2, textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTranslate}
                    sx={{
                      background: "linear-gradient(to right, #6a11cb, #2575fc)",
                      textTransform: "none",
                    }}
                  >
                    Translate to French
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Output Section */}
            {frenchText && (
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "#f0f8ff",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: "#2575fc",
                    }}
                  >
                    French Translation
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={frenchText}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      backgroundColor: "#ffffff",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<FaCopy />}
                      onClick={handleCopy}
                      sx={{
                        textTransform: "none",
                        borderColor: "#2575fc",
                        color: "#2575fc",
                        "&:hover": {
                          background: "#2575fc",
                          color: "#fff",
                        },
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<FaVolumeUp />}
                      onClick={handlePlayAudio}
                      sx={{
                        background: "linear-gradient(to right, #6a11cb, #2575fc)",
                        textTransform: "none",
                      }}
                    >
                      Play
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              
            )}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default EnglishToFrenchTranslator;

