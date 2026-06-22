import React from "react";
import { Box, Button, Container, Stack, Typography, GlobalStyles } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  TbMessageCircle2,
  TbWifi,
  TbBellRinging,
  TbKeyboard,
  TbUserEdit,
  TbArrowRight,
} from "react-icons/tb";

const fonts = (
  <GlobalStyles
    styles={{
      "@import":
        "url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@500&display=swap')",
      "@keyframes pulseDot": {
        "0%, 100%": { boxShadow: "0 0 0 0 rgba(52,211,153,0.45)" },
        "50%": { boxShadow: "0 0 0 6px rgba(52,211,153,0)" },
      },
      "@keyframes bubbleIn": {
        "0%": { opacity: 0, transform: "translateY(6px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      "@keyframes typingBounce": {
        "0%, 60%, 100%": { transform: "translateY(0)", opacity: 0.4 },
        "30%": { transform: "translateY(-4px)", opacity: 1 },
      },
    }}
  />
);

const features = [
  {
    icon: TbMessageCircle2,
    title: "Real-time messaging",
    description: "Messages arrive the instant they're sent — no refresh, no delay.",
    tag: "LIVE",
  },
  {
    icon: TbWifi,
    title: "Dynamic online status",
    description: "See who's around right now, updated the second it changes.",
    tag: "SYNCED",
  },
  {
    icon: TbBellRinging,
    title: "Notifications",
    description: "New messages and friend requests reach you without a delay.",
    tag: "INSTANT",
  },
  {
    icon: TbKeyboard,
    title: "Typing indicator",
    description: "Know the moment someone starts typing back to you.",
    tag: "LIVE",
  },
  {
    icon: TbUserEdit,
    title: "Profile management",
    description: "Update your name, avatar and details whenever you like.",
    tag: "ANYTIME",
  },
];

const palette = {
  bg: "#0B0D10",
  surface: "#14171C",
  surfaceRaised: "#1B1F26",
  border: "rgba(255,255,255,0.08)",
  textPrimary: "#ECEEF1",
  textMuted: "#8D94A0",
  signal: "#34D399",
  action: "#6C7BFF",
};

const ChatMockup = () => {
  const messages = [
    { from: "them", text: "Hey! you around?" },
    { from: "me", text: "Yep, omw — 5 mins" },
    { from: "them", text: "Perfect, see you soon" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 380,
        borderRadius: 3,
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.surface,
        overflow: "hidden",
      }}
    >
      {/* header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ px: 2.5, py: 2, borderBottom: `1px solid ${palette.border}` }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: palette.surfaceRaised,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: palette.textPrimary,
            position: "relative",
            flexShrink: 0,
          }}
        >
          AR
          <Box
            sx={{
              position: "absolute",
              bottom: -1,
              right: -1,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: palette.signal,
              border: `2px solid ${palette.surface}`,
              animation: "pulseDot 2.4s ease-out infinite",
            }}
          />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: palette.textPrimary,
              lineHeight: 1.2,
            }}
          >
            Aanya
          </Typography>
          <Typography
            sx={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: palette.signal,
              letterSpacing: 0.5,
            }}
          >
            online
          </Typography>
        </Box>
      </Stack>

      {/* messages */}
      <Stack spacing={1.25} sx={{ px: 2.5, py: 2.5 }}>
        {messages.map((m, i) => (
          <Box
            key={i}
            sx={{
              alignSelf: m.from === "me" ? "flex-end" : "flex-start",
              maxWidth: "80%",
              px: 1.75,
              py: 1,
              borderRadius: 2.5,
              backgroundColor: m.from === "me" ? palette.action : palette.surfaceRaised,
              color: m.from === "me" ? "#fff" : palette.textPrimary,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13.5,
              opacity: 0,
              animation: `bubbleIn 0.5s ease-out ${0.3 + i * 0.5}s forwards`,
            }}
          >
            {m.text}
          </Box>
        ))}

        {/* typing indicator */}
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{
            alignSelf: "flex-start",
            px: 1.75,
            py: 1.1,
            borderRadius: 2.5,
            backgroundColor: palette.surfaceRaised,
            opacity: 0,
            animation: "bubbleIn 0.5s ease-out 2.1s forwards",
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: palette.textMuted,
                animation: `typingBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

const FeatureRow = ({ icon: Icon, title, description, tag, isFirst }) => (
  <Stack
    direction="row"
    spacing={2.5}
    alignItems="flex-start"
    sx={{
      py: 3,
      borderTop: isFirst ? "none" : `1px solid ${palette.border}`,
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2,
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.surface,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: palette.textPrimary,
        flexShrink: 0,
      }}
    >
      <Icon size={19} />
    </Box>

    <Box sx={{ flexGrow: 1 }}>
      <Typography
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 15.5,
          color: palette.textPrimary,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13.5,
          color: palette.textMuted,
          mt: 0.4,
          maxWidth: 460,
        }}
      >
        {description}
      </Typography>
    </Box>

    <Typography
      sx={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        letterSpacing: 0.8,
        color: palette.signal,
        border: `1px solid ${palette.border}`,
        borderRadius: 1,
        px: 1,
        py: 0.4,
        whiteSpace: "nowrap",
        display: { xs: "none", sm: "block" },
      }}
    >
      {tag}
    </Typography>
  </Stack>
);

const Home = () => {
  return (
    <>
      {fonts}
      <Box sx={{ minHeight: "100vh", backgroundColor: palette.bg, color: palette.textPrimary }}>
        {/* nav */}
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: 3 }}
          >
            <Typography
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Chats
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Button
                component={RouterLink}
                to="/login"
                sx={{ color: palette.textMuted, fontFamily: "'Inter', sans-serif", fontSize: 14 }}
              >
                Sign in
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: palette.action,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2.5,
                  "&:hover": { backgroundColor: "#5A6AF0" },
                }}
              >
                Get started
              </Button>
            </Stack>
          </Stack>
        </Container>

        {/* hero */}
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 6, md: 4 }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: { xs: 6, md: 10 } }}
          >
            <Box sx={{ maxWidth: 520, textAlign: { xs: "center", md: "left" } }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ mb: 3 }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: palette.signal,
                    animation: "pulseDot 2.4s ease-out infinite",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 12,
                    letterSpacing: 1,
                    color: palette.signal,
                  }}
                >
                  LIVE NOW
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3.1rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Conversations that move as fast as you do.
              </Typography>

              <Typography
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  color: palette.textMuted,
                  mt: 3,
                  lineHeight: 1.6,
                }}
              >
                Chats keeps you and the people you talk to in sync — instant
                messages, live presence, and a calm interface that stays out
                of the way.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent={{ xs: "center", md: "flex-start" }}
                sx={{ mt: 4 }}
              >
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  disableElevation
                  endIcon={<TbArrowRight size={17} />}
                  sx={{
                    backgroundColor: palette.action,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 14.5,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    "&:hover": { backgroundColor: "#5A6AF0" },
                  }}
                >
                  Create account
                </Button>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderColor: palette.border,
                    color: palette.textPrimary,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14.5,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    "&:hover": { borderColor: palette.textMuted, backgroundColor: "transparent" },
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", maxWidth: 380 }}>
              <ChatMockup />
            </Box>
          </Stack>
        </Container>

        {/* features */}
        <Container maxWidth="md">
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            {features.map((f, i) => (
              <FeatureRow key={f.title} {...f} isFirst={i === 0} />
            ))}
          </Box>
        </Container>

        {/* footer cta */}
        <Container maxWidth="sm">
          <Stack alignItems="center" spacing={2} sx={{ py: { xs: 8, md: 10 }, textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", md: "1.9rem" },
              }}
            >
              Your next conversation is one tap away.
            </Typography>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              disableElevation
              endIcon={<TbArrowRight size={17} />}
              sx={{
                backgroundColor: palette.action,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14.5,
                textTransform: "none",
                borderRadius: 2,
                px: 3.5,
                py: 1.2,
                mt: 1,
                "&:hover": { backgroundColor: "#5A6AF0" },
              }}
            >
              Get started — it's free
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;