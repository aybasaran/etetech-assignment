import { Request, Response } from "express";
import {
  getLatest3Companies,
  deleteACompany,
  getCompanyById,
  getAllCompanies,
  updateCompany,
  createCompany,
} from "../services/company.service";

// export async function createCompanyHandler(req: Request, res: Response) {}

export async function listCompaniesHandler(req: Request, res: Response) {
  try {
    if (req.query.lm || req.query.srt) {
      const companies = await getLatest3Companies();
      res.status(200).json(companies);
    } else {
      const companies = await getAllCompanies();
      res.status(200).json(companies);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteCompanyHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteACompany(id);
    res.status(200).json({ success: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCompanyByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const company = await getCompanyById(id);
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateCompanyByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    await updateCompany(id, data);
    res.status(200).json({ success: "Company updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createCompanyHandler(req: Request, res: Response) {
  try {
    const data = req.body;
    await createCompany(data);
    res.status(200).json({ success: "Company created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
