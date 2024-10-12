import { Response } from "express";
import { UserEntity } from "../../entities";
import { errorHandlerWrapper } from "../../utils";
import { titleService } from "../../services";
import httpStatus from "http-status";

const deleteTitleHandler = async (req, res: Response): Promise<void> => {
    const user: UserEntity = req.user;
    const { titleId } = req.params;
    const deletedTitle = await titleService.deleteTitle(user.uuid, titleId);

    if (deletedTitle) {
        res.status(httpStatus.OK).json({ message: "Title deleted successfully" });
    } else {
        res.status(httpStatus.NOT_FOUND).json({ message: "Title not found or unauthorized" });
    }
};

export const deleteTitleController = errorHandlerWrapper(deleteTitleHandler);
