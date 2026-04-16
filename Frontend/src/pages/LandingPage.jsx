import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box, Stack, Grid, Card, CardContent, Avatar, Chip } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { bgGradient, matBlack, orange, orangeLight, grayColor, lightBlue } from "../components/constants/color";
import { Security, Group, Speed, EmojiEmotions, AdminPanelSettings, NotificationsActive, CloudUpload, Lock } from "@mui/icons-material";

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                border: "1px solid rgba(255,255,255,0.8)",
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "translateY(-10px)", boxShadow: "0 20px 50px rgba(37, 99, 235, 0.15)" }
            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Box
                    sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: "50%",
                        bgcolor: `${orange}15`,
                        color: orange,
                        display: "inline-flex",
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: matBlack }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {desc}
                </Typography>
            </CardContent>
        </Card>
    </motion.div>
);

const LandingPage = () => {
    const featuresRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

    const scrollToFeatures = () => {
        featuresRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
            <Box
                sx={{
                    position: "relative",
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                    textAlign: "center",
                    isolation: "isolate",
                }}
            >
                <Box sx={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, bgcolor: `${orange}15`, borderRadius: "50%", filter: "blur(80px)", zIndex: -1 }} />
                <Box sx={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, bgcolor: "#8b5cf615", borderRadius: "50%", filter: "blur(100px)", zIndex: -1 }} />

                <motion.div style={{ y: heroY }}>
                    <Chip
                        label="🚀  The Future of Messaging is Here"
                        sx={{
                            bgcolor: "white",
                            color: orange,
                            fontWeight: 600,
                            mb: 3,
                            px: 2,
                            py: 0.5,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 800,
                            color: matBlack,
                            mb: 3,
                            fontSize: { xs: "3rem", md: "5rem" },
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Connect Instantly with <br />
                        <Box component="span" sx={{
                            background: `linear-gradient(to right, ${orange}, #8b5cf6)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            Chattrix
                        </Box>
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#64748b",
                            mb: 6,
                            maxWidth: "700px",
                            lineHeight: 1.6,
                            mx: "auto",
                            fontSize: { xs: "1.1rem", md: "1.3rem" },
                            fontWeight: 400
                        }}
                    >
                        Experience the power of real-time connection. Secure chats, dynamic groups, and seamless file sharing in one beautiful platform.
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        bgcolor: orange,
                                        fontSize: "1.125rem",
                                        padding: "16px 48px",
                                        borderRadius: "50px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        boxShadow: `0 20px 40px -10px ${orange}50`,
                                        "&:hover": {
                                            bgcolor: "#1d4ed8",
                                        },
                                    }}
                                >
                                    Start Chatting Now
                                </Button>
                            </motion.div>
                        </Link>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="text"
                                size="large"
                                onClick={scrollToFeatures}
                                endIcon={<Speed />}
                                sx={{
                                    color: "#475569",
                                    fontSize: "1.125rem",
                                    padding: "16px 32px",
                                    borderRadius: "50px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    "&:hover": {
                                        bgcolor: "rgba(0,0,0,0.03)",
                                        color: matBlack
                                    },
                                }}
                            >
                                Explore Features
                            </Button>
                        </motion.div>
                    </Stack>
                </motion.div>
            </Box>

            <Box
                ref={featuresRef}
                sx={{
                    py: 12,
                    px: { xs: 2, md: 8 },
                    background: "linear-gradient(to bottom, #ffffff, #f8fafc)"
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 10 }}>
                        <Typography
                            variant="overline"
                            sx={{ color: orange, fontWeight: 700, letterSpacing: 1.5, mb: 2, display: "block" }}
                        >
                            POWERFUL FEATURES
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                color: matBlack,
                                mb: 3,
                                fontSize: { xs: "2rem", md: "3rem" }
                            }}
                        >
                            Everything you need to connect.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto", fontSize: "1.1rem" }}>
                            Chattrix provides a complete suite of tools to make your conversations smooth, secure, and fun.
                        </Typography>
                    </Box>

                    <Grid container spacing={4} justifyContent="center">
                        {[
                            {
                                title: "Real-time Messaging",
                                desc: "Send and receive messages instantly powered by Socket.io technology. No delays, just connection.",
                                icon: <Speed fontSize="large" />,
                                delay: 0.1
                            },
                            {
                                title: "Secure Authentication",
                                desc: "Keep your account safe with robust JWT authentication and protected routes.",
                                icon: <Lock fontSize="large" />,
                                delay: 0.2
                            },
                            {
                                title: "File Sharing",
                                desc: "Share images, documents, and media seamlessly directly within your chats.",
                                icon: <CloudUpload fontSize="large" />,
                                delay: 0.3
                            },
                            {
                                title: "Secure Groups",
                                desc: "Create private groups for your team, friends, or community. Manage members and permissions easily.",
                                icon: <Group fontSize="large" />,
                                delay: 0.4
                            }
                        ].map((item, index) => (
                            <Grid item xs={12} sm={6} md={6} key={index}>
                                <FeatureCard {...item} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ bgcolor: "#0f172a", color: "white", py: 8 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="space-between">
                        <Grid item xs={12} md={4}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", background: `linear-gradient(to right, ${orange}, #8b5cf6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Chattrix
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#94a3b8", mb: 4, maxWidth: "300px", lineHeight: 1.7 }}>
                                Building connections that matter. Join thousands of users experiencing the future of chat today.
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 600, mb: 3 }}>Platform</Typography>
                            <Stack spacing={2}>
                                <Link to="#" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.9rem" }}>Features</Link>
                                <Link to="#" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.9rem" }}>Integrations</Link>
                                <Link to="#" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.9rem" }}>Pricing</Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 600, mb: 3 }}>Company</Typography>
                            <Stack spacing={2}>
                                <Link to="#" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.9rem" }}>About Us</Link>
                                <Link to="#" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.9rem" }}>Careers</Link>
                                <Link to="#" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.9rem" }}>Contact</Link>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box sx={{ borderTop: "1px solid #1e293b", pt: 4, mt: 8, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                        <Typography variant="caption" sx={{ color: "#64748b" }}>
                            © {new Date().getFullYear()} Chattrix Inc. All rights reserved.
                        </Typography>
                        <Stack direction="row" spacing={3}>
                            <Link to="#" style={{ textDecoration: "none", color: "#64748b", fontSize: "0.875rem" }}>Privacy Policy</Link>
                            <Link to="#" style={{ textDecoration: "none", color: "#64748b", fontSize: "0.875rem" }}>Terms of Service</Link>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
