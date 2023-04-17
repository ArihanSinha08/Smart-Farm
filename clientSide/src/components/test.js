<ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Smart Farm
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Smart Agriculture
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat reiciendis adipisci voluptates! Quis illum ipsum inventore fugiat odio assumenda beatae tempore facere minima, velit minus quo iusto recusandae cupiditate id incidunt harum totam!
                        </Typography>
                        {/* <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack> */}
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={5}>
                        {/* {cards.map((card) => ( */}
                            <Grid item key={1} xs={12} sm={4} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <Typography gutterBottom variant="h5" component="h2">
                                           { temperature }
                                        </Typography>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        // image="https://source.unsplash.com/random"
                                        // alt="temp"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Temperature
                                        </Typography>
                                        <Typography>
                                            
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions> */}
                                </Card>
                            </Grid>
                            <Grid item key={2} xs={12} sm={4} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <Typography gutterBottom variant="h5" component="h2">
                                           { humidity }
                                        </Typography>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        // image="https://source.unsplash.com/random"
                                        // alt="temp"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Humidity
                                        </Typography>
                                        <Typography>
                                            
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions> */}
                                </Card>
                            </Grid>
                            <Grid item key={3} xs={12} sm={4} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <Typography gutterBottom variant="h5" component="h2">
                                           { SoilMoisture }
                                        </Typography>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        // image="https://source.unsplash.com/random"
                                        // alt="temp"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Soil Moisture
                                        </Typography>
                                        <Typography>
                                            
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions> */}
                                </Card>
                            </Grid>
                        {/* ))} */}
                        
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                {/* <Copyright /> */}
            </Box>
            {/* End footer */}
        </ThemeProvider>