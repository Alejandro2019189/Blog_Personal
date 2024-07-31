import Publications from './publications.model.js';

//Esto son las funciones correspondientes a Publicaciones
export const publicationsPost = async (req, res) => {
    try {
        const { title, content, author, creationDate } = req.body;

        if (!title || !content || !author || !creationDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const parsedDate = new Date(creationDate);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "It is not a valid date" });
        }

        const newPublication = new Publications({
            title,
            content,
            author,
            creationDate: parsedDate,
        });

        const savedPublication = await newPublication.save();

        res.status(201).json(savedPublication);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
    }
}

export const publicationsPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author, creationDate } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Publication ID is required" });
        }

        if (!title || !content || !author || !creationDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const parsedDate = new Date(creationDate);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "It is not a valid date" });
        }

        const updatedPublication = await Publications.findByIdAndUpdate(
            id,
            { title, content, author, creationDate: parsedDate },
            { new: true, runValidators: true }
        );

        if (!updatedPublication) {
            return res.status(404).json({ message: "Publication not found" });
        }

        res.status(200).json(updatedPublication);
    } catch (error) {
        console.error("Error editing post:", error);
        res.status(500).send("Error editing post");
    }
}

export const publicationsDelete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Publication ID is required" });
        }

        const deletedPublication = await Publications.findByIdAndDelete(id);

        if (!deletedPublication) {
            return res.status(404).json({ message: "Publication not found" });
        }

        res.status(200).json({ message: "Publication deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Error deleting post");
    }
}

export const publicationsGet = async (req, res) => {
    try {
        const publications = await Publications.find();
        res.status(200).json(publications);
    } catch (error) {
        console.error("Error fetching publications:", error);
        res.status(500).send("Error fetching publications");
    }
}

//Esto son las funciones correspondientes a Comentarios
export const commentsPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, content } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Publication ID is required" });
        }

        if (!author || !content) {
            return res.status(400).json({ message: "Author and Content are required" });
        }

        const publications = await Publications.findById(id);

        if (!publications) {
            return res.status(404).json({ message: "Publication not found" });
        }

        const newComment = {
            author,
            content,
            creationDate: new Date(),
        };

        publications.comments.push(newComment);

        const updatedPublication = await publications.save();
        res.status(200).json(updatedPublication);

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
    }
}

export const commentsPut = async (req, res) => {
    try {
        const { publicationId, commentId } = req.params; 
        const { author, content } = req.body;

        if (!publicationId || !commentId) {
            return res.status(400).json({ message: "Publication ID and Comment ID are required" });
        }

        if (!author || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const publication = await Publications.findOne({ "comments._id": commentId });

        if (!publication) {
            return res.status(404).json({ message: "Publication or Comment not found" });
        }

        const commentIndex = publication.comments.findIndex(comment => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found in the publication" });
        }

        publication.comments[commentIndex].author = author;
        publication.comments[commentIndex].content = content;

        const updatedPublication = await publication.save();

        res.status(200).json(updatedPublication.comments[commentIndex]);
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).send("Error updating comment");
    }
}

export const commentsDelete = async (req, res) => {
    try {
        const { publicationId, commentId } = req.params;

        if (!publicationId || !commentId) {
            return res.status(400).json({ message: "Publication ID and Comment ID are required" });
        }

        const publication = await Publications.findOne({ "comments._id": commentId });

        if (!publication) {
            return res.status(404).json({ message: "Publication or Comment not found" });
        }

        const updatedComments = publication.comments.filter(comment => comment._id.toString() !== commentId);

        publication.comments = updatedComments;

        await publication.save();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).send("Error deleting comment");
    }
}

export const commentsGet = async (req, res) => {
    try {
        const { publicationId } = req.params;

        if (!publicationId) {
            return res.status(400).json({ message: "Publication ID is required" });
        }

        const publication = await Publications.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ message: "Publication not found" });
        }

        res.status(200).json(publication.comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).send("Error fetching comments");
    }
}