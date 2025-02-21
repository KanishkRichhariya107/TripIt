class TravelController {
    async getCheapestPackages(req, res) {
        const { source, destination } = req.body;

        if (!source || !destination) {
            return res.status(400).json({ error: 'Source and destination are required.' });
        }

        try {
            const goibiboPackages = await goibiboService.fetchPackages(source, destination);
            const makemytripPackages = await makemytripService.fetchPackages(source, destination);
            const bookingPackages = await bookingService.fetchPackages(source, destination);

            const allPackages = [...goibiboPackages, ...makemytripPackages, ...bookingPackages];

            const cheapestPackage = allPackages.reduce((cheapest, current) => {
                return current.price < cheapest.price ? current : cheapest;
            });

            res.status(200).json({ cheapestPackage });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new TravelController();