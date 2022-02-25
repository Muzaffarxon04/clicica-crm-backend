const {AllHistory, addDirection, Direction, deleteQueue, QueueHistory, getAdminId} = require('./model')


module.exports = {
    DIRECTION: async (req, res) => {
        try {
            const direction = await Direction()

            res.json(direction)

        } catch (error) {
            console.log(error.message);
        }
    },

    ADD_DIRECTION: async (req, res) => {
        try {
            const { direction_name } = req.body

            const rows = await addDirection(direction_name)

            if (rows) {
                res.json(rows)
                console.log(rows);
            }
        } catch (error) {
            console.log(error.message);
        }
    },

    DELETE_QUEUE: async (req, res) => {
        try {
            const { id } = req.params

            const deletequeue = await deleteQueue(id)

            res.status(202).json('DELETED')

        } catch (error) {
            console.log(error.message);
        }
    },

    ALL_HISTORY: async (req, res) => {
        try {
            const allHistorys = await AllHistory()

            res.json(allHistorys)

        } catch (error) {
            console.log(error.message);
        }
    },

    QUEUE_HISTORY: async (req, res) => {
        try {
            const { id } = req.params
console.log(id);

            const queueHistory = await QueueHistory(id)

            res.json(queueHistory)

        } catch (error) {
            console.log(error.message);
        }
    }


}