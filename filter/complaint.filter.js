const complaintFilter = (req) => {
    // let filterArr = [];
    // const filters = {};
    // if (req.query.search_text) {
    //     filterArr.push({ complaint_no: { $regex: req.query.search_text, $options: 'i' } });
    // }

    // if (req.query.search_text)
    //     if (!isNaN(req.query.search_text))
    //         if (req.query.search_text) {
    //             filterArr.push({ ward_no: { $eq: req.query.search_text } });
    //         }

    // if (filterArr.length > 0) {
    //     filters.$or = filterArr;
    // }

    // console.log(filters)
    // return filters
}

module.exports.getComplaintFilter = complaintFilter