const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchPlans = async () => {
      try {
        const response = await fetch(`${base_url}/api/v1/plans`);
        const data = await response.json();
        setPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, [navigate]);

  const userId = JSON.parse(localStorage.getItem("user"))?.id || ""; // Get current user's ID

  if (loading) {
    return (
      <div>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </div>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#eaf4fc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, padding: 2 }}>
        <Typography
          variant="h3"
          gutterBottom
          textAlign="center"
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          Subscription Plans for Learning French
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          textAlign="center"
          gutterBottom
        >
          Choose a plan that suits your goals and start mastering the French language today!
        </Typography>
        <Grid container spacing={4}>
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan._id}>
              <SubscriptionCard
                planName={plan.planName}
                price={plan.price}
                duration={plan.duration}
                features={plan.features}
                updatedAt={new Date(plan.updatedAt).toLocaleDateString()}
                userId={userId}
                planId={plan._id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default SubscriptionPlans;
