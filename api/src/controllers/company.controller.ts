import { Request, Response } from "express";
import {
  getLatest3Companies,
  deleteACompany,
  getCompanyById,
} from "../services/company.service";

// export async function createCompanyHandler(req: Request, res: Response) {}

// export async function updateCompanyHandler(req: Request, res: Response) {}

// export async function deleteCompanyHandler(req: Request, res: Response) {}

export async function listCompaniesHandler(req: Request, res: Response) {
  if (req.query.lm || req.query.srt) {
    const companies = await getLatest3Companies();
    res.status(200).json(companies);
  }
}

export async function deleteCompanyHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteACompany(id);
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getCompanyByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const company = await getCompanyById(id);
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
