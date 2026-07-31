---
title: Customer Management
sidebar_position: 2
---

##

**Navigation**: Left sidebar → “Customer Management” → “Individual Users / Enterprise Users”

Customer Management is used to view individual KYC, enterprise KYB, onboarding information, and onboarding progress. The “Investors” module focuses more on trading accounts and asset management.

## Individual User Onboarding

Search by name, mobile number, email, or VC User ID, and filter by onboarding status. The list shows user information, contact details, preferred language, onboarding status, Sumsub status, profile preview, registration time, and a link to the details.

<img src={require('../assets/V102/customers-personal-list.png').default} alt="Individual customer list" style={{ display: 'block', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />

### Individual User Information

After opening the details page, verify the following sections:

| Section | What to Check |
| --- | --- |
| **Identity and account** | Name, contact details, nationality, document type, preferred language, and onboarding status |
| **KYC** | Sumsub status, Applicant ID, Inspection ID, application platform, and IP country |
| **Risk and supplementary information** | Risk-assessment results, supplementary questionnaires, and outstanding items |
| **Employment and finances** | Occupation, income, assets, source of funds, and investment experience |
| **Document signing** | Individual account-opening application, CRS tax form, W-8BEN tax form, and signature information |
| **Fee configuration** | Fee configuration; the user’s fees can be **edited** |

<img src={require('../assets/V102/customers-personal-detail.png').default} alt="Individual customer details" style={{ display: 'block', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />

> ⚠️ Document images, contact details, and financial data are sensitive information. View and use them only when required for the business task.

## Enterprise User Onboarding

### Enterprise User Information

- Search the enterprise list by company name, registration number, contact person, email, mobile number, or VC User ID, and filter by profile status or onboarding status.
- Onboarding statuses include All, Draft, Generating Documents, Pending Signature, Opening Account, Generation Failed, and Account Opened.

<img src={require('../assets/V102/customers-enterprise-list.png').default} alt="Enterprise customer list" style={{ display: 'block', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />

The list shows company information, contact details, enterprise type and jurisdiction of registration, profile status, onboarding status, creation time, and available actions.

<img src={require('../assets/V102/customers-enterprise-actions.png').default} alt="Enterprise customer action menu" style={{ display: 'block', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />

Available actions depend on the record status:

- **View**: Open saved enterprise information.
- **Continue onboarding**: Resume from the last saved stage of a draft.
- **Delete draft**: Use only after confirming that onboarding will not continue, that no information needs to be retained, and that deletion has been authorized.

### Enterprise Onboarding Process

### Preparation

Prepare approved enterprise information before starting.

- Legal company name, entity type, jurisdiction of registration, date of incorporation, and registration number;
- Registered, business, and correspondence addresses;
- Nature of business, principal-business description, and years in operation;
- Contact person, statement email, telephone number, and optional fax number;
- Directors, shareholders, ultimate beneficial owners, and ownership structure;
- Financial information, source of funds, tax status, account requirements, and compliance declarations;
- Enterprise evidence and signing authorizations required by the current page.

### Enter, Save, and Resume

1. In the “Enterprise Users” list, click “Enterprise Onboarding.”
2. Link an investor to begin onboarding for that investor.
3. The step bar shows the current stage: **Company Profile → Finance and Structure → Compliance and Accounts → Tax and Documents → Document Signing**.
4. “Save Draft” saves the content entered so far and is appropriate when leaving temporarily.
5. “Save & Next” validates the required fields in the current stage before moving to the next stage.
6. Save current changes before using “Previous” to go back.
7. After returning to the list, resume the same draft and first check whether the stage, fields, and uploaded files are complete.

Fields marked with `*` are required in the current stage. If validation fails, correct each item according to the page prompts; do not use meaningless characters to bypass validation.

### Step 0: Link an Investor

Search by mobile number, email, or UID, then link the investor for whom enterprise onboarding will be completed.

<img src={require('../assets/V102/costomers-e-open-connectVC.png').default} alt="Enterprise onboarding Step 0: Link an Investor" style={{ display: 'block', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />

### Step 1: Company Profile

Enter the enterprise’s identity, address, business, and contact information.

| Area | Visible Fields and Actions |
| --- | --- |
| **Entity information** | Legal name in English, optional Chinese name or “Confirm no Chinese name,” entity type, jurisdiction of registration, date of incorporation, company registration number, and optional business registration number |
| **Registered address** | Address line 1, city, province/state, postal code, and country or region |
| **Business address** | Full business address; even when it matches the registered address, confirm it as required by the page |
| **Correspondence-address source** | Select same as registered address, same as business address, or use another correspondence address |
| **Nature of business** | Nature of business, principal-business description, and years in operation |
| **Contact person** | Contact name, email, country/area code and telephone number, office telephone number, optional fax, statement email, and supplementary information |

<img src={require('../assets/V102/costomer-e-s1.png').default} alt="Enterprise onboarding Step 1: Company Profile" style={{ display: 'block', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />

### Step 2: Finance and Structure

This stage records the enterprise’s financial position and control structure. Complete the financial profile and sources of funds or wealth shown on the current page, then register each director, shareholder, and ultimate beneficial owner.

:::warning
- When using “Add” controls to enter multiple people or multiple layers, use separate information for every entry.
- Total ownership or control percentages must agree with the enterprise’s structure documents.
- If the same natural person is a director, shareholder, and/or ultimate beneficial owner, disclose that person in each corresponding section as required by the page.
:::

<img src={require('../assets/V102/costomer-e-s2.png').default} alt="Enterprise onboarding Step 2: Finance and Structure" style={{ display: 'block', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />

### Step 3: Compliance and Accounts

This stage records compliance declarations, the expected use of the account, and account-related selections. Read each question, answer it using approved information, and verify the account contact or settlement details.

:::warning
- “Account” selections in this stage are onboarding-application information; they do not mean that an account has been created or approved.
- If the information involves sanctioned jurisdictions, politically exposed persons, regulated activities, or third-party funds, stop and refer the case to compliance personnel.
:::

<img src={require('../assets/V102/costomer-e-s3.png').default} alt="Enterprise onboarding Step 3: Compliance and Accounts" style={{ display: 'block', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />

### Step 4: Tax and Documents

Enter the tax residence, tax identification number, or tax declarations required by the page, and upload the enterprise documents listed in the current interface.

:::warning
1. File names, company names, and validity periods must agree with the entity information.
2. Before uploading, confirm that each file is clear, complete, not protected by an unrelated password, and belongs to the enterprise.
3. Upload only authorized official documents. In a test environment, use only approved test files.
4. Move to the next stage only after the page shows that the file has been received or uploaded successfully.
5. When replacing a file, confirm whether the old file has been replaced so that conflicting versions are not retained together.
:::

<img src={require('../assets/V102/costomer-e-s4.png').default} alt="Enterprise onboarding Step 4: Tax and Documents" style={{ display: 'block', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />

### Step 5: Document Signing

The final stage is used to review documents awaiting signature and complete the authorized signing workflow.

:::warning
- Verify the company name, signer identity, agreement version, and language.
- Confirm that the signer has valid authorization and that all prerequisite approvals are complete.
- If information is incorrect, return to the corresponding stage, correct it, and review it again.
- After confirming that everything is correct, sign and complete the final submission.
:::

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', justifyItems: 'start' }}>
  <img src={require('../assets/V102/costomer-e-s5.png').default} alt="Enterprise onboarding Step 5: Document Signing" style={{ display: 'block', width: '100%', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />
  <img src={require('../assets/V102/costomer-e-s5onlinesign.png').default} alt="Enterprise onboarding: Online Signing" style={{ display: 'block', width: '100%', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />
  <img src={require('../assets/V102/costomer-e-s5onlinesignfull.png').default} alt="Enterprise onboarding: Online Signing Document" style={{ display: 'block', width: '100%', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />
  <img src={require('../assets/V102/costomer-e-s5onlinesignfull2.png').default} alt="Enterprise onboarding: Complete Online Signing" style={{ display: 'block', width: '100%', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />
  <img src={require('../assets/V102/costomer-e-s5over.png').default} alt="Enterprise onboarding: Signing Complete" style={{ display: 'block', width: '100%', marginLeft: 0, marginRight: 'auto', objectPosition: 'left top' }} />
</div>

### Submission Status

| Status | Handling |
| --- | --- |
| **Draft** | Resume with “Continue Onboarding”; check the stage, fields, and attachments before continuing |
| **Current-stage validation failed** | Remain in the current stage and complete required fields or correct formats according to the prompts |
| **Pending review / Submitted** | Follow the page status and organizational approval process; do not create another application |
| **Correction required** | First confirm whether the current status allows editing; if not, refer the case to an authorized person |

> ⚠️ Deleting a draft removes unsubmitted information. Final submission, agreement acceptance, and signing may have business or legal consequences and must be performed only by authorized personnel after review is complete.
