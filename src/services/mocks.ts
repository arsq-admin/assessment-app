export const mockConfig = {
  id: "VczeKvZn9W2bklgKjpziX",
  name: "Cyber Security Assessment - Low Risk",
  status: "DRAFT",
  outcomes: {
    COMPLETE: {
      title: "Thank you for completing the assessment.",
      body: "",
    },
  },
  sections: [
    {
      name: "Certification",
      questions: [
        {
          id: "SAQ000-01",
          title: "Do you have any Information Security Certification?",
          guidance:
            "Example certification includes:  Cyber Essential (Plus) and ISO 27001",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "Yes",
              value: "yes",
              points: 0,
            },
            {
              name: "No",
              value: "no",
              points: 0,
            },
          ],
          logic: [
            {
              condition: [
                {
                  op: "EQUAL",
                  value: "no",
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ2",
              },
            },
          ],
        },
        {
          id: "SAQ000-02",
          title:
            "Check all information certificates that you own and provide the associated certificate number.",
          type: "MULTIPLE_CHOICE",
          allowMultiple: true,
          options: [
            {
              name: "Cyber Essential (Plus)",
              value: "cyberEssentialPlus",
              points: 0,
            },
            {
              name: "ISO 27001",
              value: "iso27001",
              points: 0,
            },
            {
              name: "Other",
              value: "other",
              freeText: true,
              freeTextLabel: "Please name the certificate providers.",
              points: 0,
            },
          ],
          logic: [
            {
              condition: [
                {
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ6",
              },
            },
          ],
        },
      ],
    },
    {
      name: "Managing Security Risk",
      questions: [
        {
          id: "SAQ2",
          title:
            "Have appropriate information security roles and responsibilities been defined and allocated?",
          guidance:
            "There should be an identified, and named, board or senior representative (or a person with the direct delegated authority) who is responsible for the information security aspects of the service and all employees, contractors and third parties. This may, for example, be someone with the title ‘Chief Security Officer’, ‘Chief Information Officer’ or ‘Chief Technical Officer’. There should be clarity on who in the organisation has overall accountability for the security of relevant networks and information systems. If required, a Data Protection Officer should be appointed.\n\nThe NCSC's 10 Steps to Cyber Security:\nhttps://www.ncsc.gov.uk/guidance/10-steps-information-risk-management-regime,Risk Management Regime,\nhttps://www.ncsc.gov.uk/guidance/caf-objective-a,The NCSC's NIS Cyber Assessment Framework: A1\n\nThe NCSC and ICO's GDPR Security Outcomes guidance:\nhttps://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,A1 (Data Protection Officer)\n\nThe NCSC's Cloud Security Principles\nhttps://www.ncsc.gov.uk/guidance/cl-security-principle-4-governance-framework,Principle 4: Governance Framework",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No - Responsibility for information security has not been formally assigned",
              value:
                "noResponsibilityForInformationSecurityHasNotBeenFormallyAssigned",
              points: 0,
            },
            {
              name: "Partial – Responsibilities are understood but not formalised",
              value: "partialResponsibilitiesAreUnderstoodButNotFormalised",
              minimumRequired: true,
              points: 25,
            },
            {
              name: "Yes – Clearly assigned roles and responsibilities, including senior levels",
              value:
                "yesClearlyAssignedRolesAndResponsibilitiesIncludingSeniorLevels",
              points: 35,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Governance",
        },
        {
          id: "SAQ4",
          title:
            "Are there arrangements for reporting significant cyber security incidents to external authorities?",
          guidance:
            "As a minimum, organisations need to know when they should or must report information security incidents to external authorities, and how to do so. Depending on the circumstances, this may include law enforcement (in Scotland, call Police Scotland 101), the Information Commissioner, NIS Competent Authorities, and other sector-specific regulators.\n\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-4-governance-framework,The NCSC's Small Business Guide: Avoid Phishing Attacks: Tip 4\n\nThe NCSC's 10 Steps to Cyber Security:\nhttps://www.ncsc.gov.uk/guidance/10-steps-information-risk-management-regime, Risk Management Regime\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B6\n\nThe NCSC and ICO's GDPR Security Outcomes Guidance\nhttps://www.ncsc.gov.uk/guidance/gdpr-security-outcomes ,D2",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 15,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Governance",
        },
        {
          id: "SAQ6",
          title:
            "Is there a risk management regime which assesses the risks to relevant information and systems?",
          guidance:
            "Organisations should apply a similar level of rigour to assessing the risks to technology, systems and information assets as they would to other risks that might have a material business impact, such as regulatory, financial or operational risks.\nSenior management should have visibility of key risk decisions made throughout the organisation. This can be achieved by embedding an appropriate risk management regime across the organisation, which is actively supported by the board, senior managers and an empowered governance structure. Examples of good practice may include risk assessments (e.g. IS1/2, SP800-30, COBIT, 27005), risk registers, design authority, information governance boards, programme and project engagement with infosec professionals, change control, etc.\n\nThe NCSC's 10 Steps to Cyber Security: https://www.ncsc.gov.uk/guidance/10-steps-information-risk-management-regime,Risk Management Regime\nhttps://www.ncsc.gov.uk/guidance/caf-objective-a,The NCSC's NIS Cyber Assessment Framework: A1.c A2.a\n\nThe NCSC and ICO's GDPR Security Outcomes guidance:\nhttps://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,A2\n\nThe NCSC's Cloud Security Principles: https://www.ncsc.gov.uk/guidance/cloud-security-principle-4-governance-framework,Principle 4: Governance Framework",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No specific activities under this description",
              value: "noSpecificActivitiesUnderThisDescription",
              points: 0,
            },
            {
              name: "ICT risk assessment and management processes are done on an ad hoc basis",
              value:
                "ictRiskAssessmentAndManagementProcessesAreDoneOnAnAdHocBasis",
              minimumRequired: true,
              points: 19,
            },
            {
              name: "Fully governed and using a repeatable formal assessment process",
              value: "fullyGovernedAndUsingARepeatableFormalAssessmentProcess",
              points: 30,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Risk Management",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ11",
              },
            },
          ],
        },
        {
          id: "SAQ8",
          title:
            "Do senior management review the effectiveness of the information security programme on a regular basis?",
          guidance:
            "There should be regular auditing to assess if relevant ICT policies and procedures are effective and being followed. Senior management should review the results.\n\nhttps://www.ncsc.gov.uk/guidance/10-steps-network-security,The NCSC's 10 Steps to Cyber Security: Network Security,\nhttps://www.ncsc.gov.uk/guidance/caf-objective-a,The NCSC's NIS Cyber Assessment Framework: A2.b",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 20,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Risk Management",
        },
        {
          id: "SAQ11",
          title:
            "In which countries or regions will data or information be processed?",
          guidance:
            "Organisations must understand in which countries data will be stored, processed and managed. They should also consider how this affects their compliance with relevant legislation.\n\nData protection legislation requires that data only be processed within the EEA, or jurisdictions with adequate protections. If personal data are being processed, organisations must ensure that these requirements are complied with.\n\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-2-asset-protection-and-resilience,The NCSC's Cloud Security Principles: Principle 2: Asset protection and Resilience\nhttps://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-law-enforcement-processing/international-transfers/,The Information Commissioner's Guidance on International Transfers",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "There are no restrictions",
              value: "thereAreNoRestrictions",
              points: 0,
            },
            {
              name: "Non EEA without adequacy agreement",
              value: "nonEeaWithoutAdequacyAgreement",
              points: 0,
            },
            {
              name: "Non EEA with adequacy agreement",
              value: "nonEeaWithAdequacyAgreement",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "EEA",
              value: "eea",
              points: 15,
            },
            {
              name: "UK Only",
              value: "ukOnly",
              points: 25,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Asset Management",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ17",
              },
            },
          ],
        },
        {
          id: "SAQ15",
          title:
            "Are proportionate measures in place to ensure that storage media containing  relevant data are not compromised?",
          guidance:
            "Sensitive information should be encrypted at rest on media (hard drives, storage space, removable media, backups). If encryption is not employed then other techniques such as obfuscation or appropriate physical protection of the media are critical. Small businesses should as a minimum ensure that office equipment (laptops, PCs, etc.) uses an encryption product (such as BitLocker for Windows) in order to start up.\n\nhttps://www.ncsc.gov.uk/guidance/using-passwords-protect-your-data,The NCSC's Small Business Guide: Using Passwords to Protect Your Data\nhttps://www.ncsc.gov.uk/guidance/10-steps-removable-media-controls,The NCSC's 10 Steps to Cyber Security: Removable Media Controls\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B3.c\nThe NCSC and ICO's GDPR Security Outcomes guidance: https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,B4\nThe NCSC's Cloud Security Principles: https://www.ncsc.gov.uk/guidance/cloud-security-principle-2-asset-protection-and-resilience,Principle 2.3: Data at Rest Protection",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Asset Management",
        },
        {
          id: "SAQ16",
          title:
            "Are there appropriate policies and /or procedures in place to govern the storage and transfer of information using personal electronic devices and removable media?",
          guidance:
            "Organisations should develop and implement policies and solutions to control the use of removable media. Removable media should not be used as a default mechanism to store or transfer information. Unnecessary peripheral devices and removable media access (e.g. USB ports, CD/DVD drives) should be disabled unless there is a business case for their use.\n\nhttps://www.ncsc.gov.uk/guidance/protecting-your-organisation-malware,The NCSC's Small Business Guide: Protecting Your Organisation from Malware\n,https://www.ncsc.gov.uk/guidance/10-steps-secure-configuration,The NCSC's 10 Steps to Cyber Security: Secure Configuration\nhttps://www.ncsc.gov.uk/guidance/10-steps-removable-media-controls, The NCSC's 10 Steps to Cyber Security: Removable Media Controls\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B3.d\n\nThe NCSC and ICO's GDPR Security Outcomes guidance: https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,B4",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Asset Management",
        },
        {
          id: "SAQ17",
          title:
            "Are personal electronic devices such as smartphones, laptops and tablets configured to security best practices?",
          guidance: "",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Asset Management",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ40",
              },
            },
          ],
        },
        {
          id: "SAQ25",
          title:
            "Are appropriate screening checks performed to confirm the identity and trustworthiness of all relevant supplier and/or contractor staff, that may have access to public sector information, prior to their engagement?",
          guidance:
            "Appropriate pre-employment screening should be completed before staff and contractors are allowed access to organisation information and data. Examples of appropriate screening processes or security clearances include BPSS/BS7858, CTC, SC, DV, Standard disclosure, Enhanced disclosure, PVG.\n\nhttps://www.ncsc.gov.uk/guidance/supply-chain-security,The NCSC's Supply Chain Cyber Security collection: use Case A\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B1.b\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-6-personnel-security,The NCSC's Cloud Security Principles: Principle 6: Personnel Security",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 40,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Supplier Management",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["cyberEssentialPlus"],
                },
                {
                  questionId: "SAQ000-02",
                  op: "NOT_INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ34",
              },
            },
          ],
        },
      ],
    },
    {
      name: "Protecting from Cyber Attack & Identity and Access Management",
      questions: [
        {
          id: "SAQ29",
          title:
            "Are all users asked to authenticate appropriately before they can access relevant applications, devices, and management interfaces?",
          guidance:
            "There should be policies and procedures in place to ensure that all users are asked to authenticate before they can access applications, devices and management interfaces that are relevant to delivery of the contract. In some circumstances, e.g. privileged or remote access via the Internet to systems that operate or support essential services or that process personal data, an additional authentication factor (such as a token or hardware-backed certificates) should be used.\n\nhttps://www.ncsc.gov.uk/guidance/using-passwords-protect-your-data,The NCSC's Small Business Guide: Using Passwords to Protect Your Data\n\nhttps://www.ncsc.gov.uk/guidance/10-steps-managing-user-privileges,The NCSC's 10 Steps to Cyber Security: Managing User Privileges\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B2.a\n\nThe NCSC and ICO's GDPR Security Outcomes guidance https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,B2\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-9-secure-user-management,The NCSC's Cloud Security Principles: Principle 9: Secure User Management\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-11-external-interface-protection,The NCSC's Cloud Security Principles: Principle 11: External Interface Protection",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 20,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Access Management",
        },
        {
          id: "SAQ34",
          title:
            "Are users only granted the level of access to information and systems that they require to perform their role?",
          guidance:
            "Users should only be able to access the information and systems they require to do their jobs.\n\n- The NCSC's Small Business Guide: Using Passwords to Protect Your Data NCSC's 10 Steps to Cyber Security: Secure Configuration,The NCSC’s 10 Steps to Cyber Security: Network Security,The NCSC's 10 Steps to Cyber Security: Managing User Privileges,The NCSC's NIS Cyber Assessment Framework: B2.a,The NCSC's NIS Cyber Assessment Framework: C The NCSC and ICO's GDPR Security Outcomes guidanceThe Principle 6: Personnel Security and Principle 9: Secure User Management",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 20,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Access Management",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["cyberEssentialPlus"],
                },
                {
                  questionId: "SAQ000-02",
                  op: "NOT_INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ55",
              },
            },
          ],
        },
        {
          id: "SAQ38",
          title:
            "Is multi-factor authentication implemented to authenticate users?",
          guidance:
            "2FA greatly improves the assurance of users during the authentication process, making it much more difficult for an intruder to masquerade as one of your genuine users.\n\n2FA should be used where the facility exists, but is especially pertinent to better protect privileged user accounts, access to sensitive information and some specific activities, where such access typically presents a higher than normal level of risk.\n\nhttps://www.ncsc.gov.uk/guidance/using-passwords-protect-your-data,The NCSC's Small Business Guide: Using Passwords to Protect Your Data\nhttps://www.ncsc.gov.uk/guidance/10-steps-managing-user-privileges,The NCSC's 10 Steps to Cyber Security: Managing User Privileges\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B2.a\nThe NCSC and ICO's GDPR Security Outcomes guidance https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,B2\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-10-identity-and-authentication ,The NCSC's Cloud Security Principles: Principle 10: Identity and Authentication",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "Not supported",
              value: "notSupported",
              points: 0,
            },
            {
              name: "Implemented where available (on an ad hoc basis)",
              value: "implementedWhereAvailableOnAnAdHocBasis",
              minimumRequired: true,
              points: 10,
            },
            {
              name: "Required for administrative and especially service privileged accounts only",
              value:
                "requiredForAdministrativeAndEspeciallyServicePrivilegedAccountsOnly",
              points: 25,
            },
            {
              name: "Required for all users",
              value: "requiredForAllUsers",
              points: 41,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Access Management",
        },
        {
          id: "SAQ40",
          title:
            "When working remotely, are users required to authenticate before being allowed access to systems and information?",
          guidance:
            "Authentication should be verified at the network boundary, before access is permitted to information assets. You should use two-factor (or alternative mechanisms such as hardware-backed certificates) for higher risk activities such as remote users accessing your networks or information systems over the Internet.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Secure Configuration",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Basic user authentication - two factor authentication is implemented, where available",
              value:
                "basicUserAuthenticationTwoFactorAuthenticationIsImplementedWhereAvailable",
              minimumRequired: true,
              points: 35,
            },
            {
              name: "Basic user authentication - two factor authentication is implemented, where available and for all privileged users",
              value:
                "basicUserAuthenticationTwoFactorAuthenticationIsImplementedWhereAvailableAndForAllPrivilegedUsers",
              points: 48,
            },
            {
              name: "2FA used for all remote/home users",
              value: "2faUsedForAllRemotehomeUsers",
              points: 65,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Remote/Home Working",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ43",
              },
            },
          ],
        },
        {
          id: "SAQ42",
          title:
            "Is each user given a unique ID and password when accessing relevant systems and information?",
          guidance:
            "Each user, and Administrator, should have their own user name so that activity can be tracked and accountable. For some accounts an additional authentication factor (such as a token) may be appropriate.\n\nhttps://www.ncsc.gov.uk/guidance/using-passwords-protect-your-data,The NCSC's Small Business Guide: Using Passwords to Protect Your Data\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: User Access Control\nhttps://www.ncsc.gov.uk/guidance/10-steps-managing-user-privileges,\nThe NCSC's 10 Steps to Cyber Security: Managing User Privileges\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B2.a\nThe NCSC and ICO's GDPR Security Outcomes guidance https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,B2\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-10-identity-and-authentication,The NCSC's Cloud Security Principles: Principle 10: Identity and Authentication\nhttps://www.ncsc.gov.uk/guidance/password-guidance-simplifying-your-approach,The NCSC's Password Guidance: Simplifying Your Approach",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Password Policy",
        },
        {
          id: "SAQ43",
          title:
            "Are all default passwords on all relevant devices and equipment changed to something more secure prior to being put into operation?",
          guidance:
            "A lot of equipment like routers, firewalls and network equipment come from the factory with known or easily guessable passwords. Any default or guessable passwords must be changed to something non-obvious. Devices (and software) should be checked regularly, specifically to detect unchanged default passwords.\n\nhttps://www.ncsc.gov.uk/guidance/using-passwords-protect-your-data,The NCSC's Small Business Guide: Using Passwords to Protect Your Data\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Secure Configuration\nhttps://www.ncsc.gov.uk/guidance/10-steps-network-security,The NCSC's 10 Steps to Cyber Security: Network Security\nThe NCSC and ICO's GDPR Security Outcomes guidance https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,B2\nhttps://www.ncsc.gov.uk/guidance/password-guidance-simplifying-your-approach,The NCSC's Password Guidance: Simplifying Your Approach",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Password Policy",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ60",
              },
            },
          ],
        },
        {
          id: "SAQ45",
          title:
            "Is there a documented password policy that is a fundamental part of user education, and that aligns with NCSC guidance in respect of normal and privileged users?",
          guidance:
            "You should have a documented password policy and user guidance stating the format and standard of passwords to be used, aligned with NCSC guidance.\n\nYour organisational arrangements should include user education and guidance on things such as password format, how to avoid bad passwords, not choosing common passwords, not using the same password anywhere else at work or home, not to enforce regular password changes, where and how staff may record passwords, which if any software password management tools are acceptable etc.\n\nhttps://www.ncsc.gov.uk/guidance/using-passwords-protect-your-data,The NCSC's Small Business Guide: Using Passwords to Protect Your Data\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Secure Configuration\nhttps://www.ncsc.gov.uk/guidance/10-steps-managing-user-privileges,The NCSC's 10 Steps to Cyber Security: Managing User Privileges\nThe NCSC and ICO's GDPR Security Outcomes guidance https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,B2\nhttps://www.ncsc.gov.uk/guidance/password-guidance-simplifying-your-approach,The NCSC's Password Guidance: Simplifying Your Approach",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No formal documented policy",
              value: "noFormalDocumentedPolicy",
              points: 0,
            },
            {
              name: "Documented policy and guidance provided",
              value: "documentedPolicyAndGuidanceProvided",
              minimumRequired: true,
              points: 8,
            },
            {
              name: "Documented policy and guidance provided and enforced by technical controls",
              value:
                "documentedPolicyAndGuidanceProvidedAndEnforcedByTechnicalControls",
              points: 19,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Password Policy",
        },
        {
          id: "SAQ47",
          title:
            "Are password policies implemented and enforced by technical means (e.g. a  password blacklist to disallow the most common password choices?)",
          guidance:
            "NCSC guidance makes clear that organisations should consider implementing and enforcing password policies by technical means, e.g. using a password blacklist.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Secure Configuration\nhttps://www.ncsc.gov.uk/guidance/password-guidance-simplifying-your-approach,The NCSC's Password Guidance: Simplifying Your Approach",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Password Policy",
        },
        {
          id: "SAQ48",
          title:
            "Is a limit enforced on the number of failed login attempts a user can make before restricting further attempts?",
          guidance:
            "The NCSC's Cyber Essentials standard requires that, for password-based authentication in Internet-facing services, organisations must protect against \"brute-force\" password guessing by using at least one of the following methods: (i) lock accounts after no more than 10 unsuccessful attempts (ii) limit the number of guesses allowed in a specified time period to no more than 10 guesses within 5 minutes.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Secure Configuration\nhttps://www.ncsc.gov.uk/guidance/password-guidance-simplifying-your-approach,The NCSC's Password Guidance: Simplifying Your Approach",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No limit",
              value: "noLimit",
              points: 0,
            },
            {
              name: "Yes - 10 or more attempts permitted",
              value: "yes10OrMoreAttemptsPermitted",
              minimumRequired: true,
              points: 7,
            },
            {
              name: "Yes - fewer than 10 attempts permitted",
              value: "yesFewerThan10AttemptsPermitted",
              points: 18,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Password Policy",
        },
        {
          id: "SAQ55",
          title:
            "Are employees permitted to connect devices involved in delivery of the contract to public, shared, unknown, or untrusted networks or Wi-Fi?",
          guidance:
            "When public Wi-Fi hotspots (for example in hotels or coffee shops) are used, there is no way to easily find out who controls the hotspot, or to prove that it belongs to who you think it does. When connecting to these hotspots, somebody else could access what you're working on whilst connected, or your private login details that many apps and web services maintain whilst you're logged on.<br/><br/>The simplest precaution is to not connect to the Internet using unknown hotspots, and instead use your mobile 3G or 4G mobile network, which will have built-in security. You can also use Virtual Private Networks (VPNs), a technique that encrypts your data before it is sent across the Internet.\n\nhttps://www.ncsc.gov.uk/guidance/keeping-your-smartphones-and-tablets-safe,The NCSC's Small Business Guide: Keeping Your Smartphones and Tablets Safe\nhttps://www.ncsc.gov.uk/guidance/10-steps-home-and-mobile-working,The NCSC's 10 Steps to Cyber Security: Home and Mobile Working",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "Devices are able to connect to and access any network or WiFi captive portal",
              value:
                "devicesAreAbleToConnectToAndAccessAnyNetworkOrWifiCaptivePortal",
              points: 0,
            },
            {
              name: "Devices can connect but communication is routed by VPN through the organisation’s network and an unmanaged Split tunnel (Minimum at Low)",
              value:
                "devicesCanConnectButCommunicationIsRoutedByVpnThroughTheOrganisationsNetworkAndAnUnmanagedSplitTunnelMinimumAtLow",
              minimumRequired: true,
              points: 40,
            },
            {
              name: "Devices can connect but all communication is routed securely by VPN through the organisation’s network or secure Split tunnel (Minimum at Moderate)",
              value:
                "devicesCanConnectButAllCommunicationIsRoutedSecurelyByVpnThroughTheOrganisationsNetworkOrSecureSplitTunnelMinimumAtModerate",
              points: 50,
            },
            {
              name: "Devices can only connect to trusted networks",
              value: "devicesCanOnlyConnectToTrustedNetworks",
              points: 55,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Device Management",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["cyberEssentialPlus"],
                },
                {
                  questionId: "SAQ000-02",
                  op: "NOT_INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ60",
              },
            },
          ],
        },
        {
          id: "SAQ57",
          title:
            "Do administrators have separate user accounts for (i) administrative work and (ii) lesser tasks, including browsing the Internet and sending email?",
          guidance:
            "An attacker having unauthorised access to an Administrator account can be far more damaging than accessing a standard user account. To reduce the damage that can be done by malware or loss of login details, ensure that staff don’t browse the web or check emails from an account with Administrator privileges.\n\nhttps://www.ncsc.gov.uk/guidance/avoiding-phishing-attacks,The NCSC's Small Business Guide: Avoiding Phishing Attacks\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: User Access Control\nhttps://www.ncsc.gov.uk/guidance/10-steps-secure-configuration,The NCSC's 10 Steps to Cyber Security: Secure Configuration\nhttps://www.ncsc.gov.uk/guidance/10-steps-network-security,The NCSC's 10 Steps to Cyber Security: Network Security\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B4.c",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 44,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Privileged Accounts",
        },
        {
          id: "SAQ60",
          title: "Is user management restricted to authorised users only?",
          guidance:
            "Because of the potential for attackers to create or alter user accounts for nefarious purposes, access to user management should be restricted to authorised users only.\n\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-9-secure-user-management,The NCSC's Cloud Security Principles: Principle 9: Secure User Management",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "User Management",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ78",
              },
            },
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["cyberEssentialPlus"],
                },
                {
                  questionId: "SAQ000-02",
                  op: "NOT_INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ115",
              },
            },
          ],
        },
        {
          id: "SAQ61",
          title:
            "Are new accounts and access permissions authorised and recorded before they are created?",
          guidance:
            "Because of the potential for attackers to create or alter user accounts for nefarious purposes, there should be a robust authorisation process for creating each new user account and assigning permissions, with records kept and regularly audited.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: User Access Control\nhttps://www.ncsc.gov.uk/guidance/10-steps-managing-user-privileges,The NCSC's 10 Steps to Cyber Security: Managing User Privileges\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B2.d",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "User Management",
        },
        {
          id: "SAQ63",
          title:
            "Do policies and procedures ensure the review and revocation of access privileges when an authorised user no longer requires access to information systems or leaves the organisation?",
          guidance:
            "Organisations must be in control of user accounts and the access privileges granted to each user account. This includes removing or disabling user accounts when no longer required (e.g. when a user changes role or moves to a different part of the organisation, after a defined period of account inactivity, or upon leaving the organisation).\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: User Access Control\nhttps://www.ncsc.gov.uk/guidance/10-steps-managing-user-privileges,The NCSC's 10 Steps to Cyber Security: Managing User Privileges\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B2. D\nhttps://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,The NSCS and ICO’s GDPR Security Outcomes Guidance: B2",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Leavers",
              value: "leavers",
              minimumRequired: true,
              points: 12,
            },
            {
              name: "Leavers and long term absence",
              value: "leaversAndLongTermAbsence",
              points: 30,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "User Management",
        },
      ],
    },
    {
      name: "System Security",
      questions: [
        {
          id: "SAQ78",
          title:
            "Are all parts of the network used to deliver the service protected from the Internet and other networks by a Firewall?",
          guidance:
            "All devices used to deliver the service that can connect to the Internet must be protected by a correctly configured firewall (or equivalent network device).\n\nhttps://www.ncsc.gov.uk/guidance/protecting-your-organisation-malware,The NCSC's Small Business Guide: Protecting Your Organisation from Malware\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Firewalls\nhttps://www.ncsc.gov.uk/guidance/10-steps-network-security,The NCSC's 10 Steps to Cyber Security: Network Security",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 7,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Configuration",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ87",
              },
            },
          ],
        },
        {
          id: "SAQ81",
          title:
            "Are the default passwords for firewalls and network edge devices changed?",
          guidance:
            "All default vendor-supplied passwords that come with any system or software should be changed before deployment. Organisations should pay particular attention to essential infrastructure devices such as routers, wireless access points, and firewalls.\n\nhttps://www.ncsc.gov.uk/guidance/password-guidance-simplifying-your-approach,The NCSC's Password Guidance: Simplifying Your Approach",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 7,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Configuration",
        },
        {
          id: "SAQ82",
          title:
            "Is administrative access to the firewall and/or network edge device blocked from the internet?",
          guidance:
            "Best practice is to manage firewalls and routers on the edge of the network from inside the network NOT from the Internet.\n\nThe NCSC's Cyber Essentials standard makes clear that, for all firewalls (or equivalent network devices), organisations must routinely prevent access to the administrative interface (used to manage firewall configuration) from the Internet, unless there is a clear and documented business need and the interface is protected by one of the following controls:\n- a second authentication factor, such as a one-time token\n- an IP whitelist that limits access to a small range of trusted addresses\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Firewalls",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes - unless there is a clear and documented business need and mitigating controls are in place",
              value:
                "yesUnlessThereIsAClearAndDocumentedBusinessNeedAndMitigatingControlsAreInPlace",
              minimumRequired: true,
              points: 7,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Configuration",
        },
        {
          id: "SAQ83",
          title:
            "Are all inbound connections from the internet or other networks blocked by default?",
          guidance:
            "https://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Firewalls",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 7,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Configuration",
        },
        {
          id: "SAQ84",
          title:
            "Are all changes to firewall rules approved, authorised and documented, together with the business reason for the change?",
          guidance:
            "Firewall rule changes should be subject to appropriate change control.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Firewalls",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No - no such policies or processes",
              value: "noNoSuchPoliciesOrProcesses",
              points: 0,
            },
            {
              name: "Yes - clear change control and authorisation policies and processes",
              value:
                "yesClearChangeControlAndAuthorisationPoliciesAndProcesses",
              minimumRequired: true,
              points: 7,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Configuration",
        },
        {
          id: "SAQ85",
          title:
            "If overly permissive firewall rules are used, is this only in exceptional circumstances, and are they removed or disabled in a timely manner when they are no longer required?",
          guidance:
            "The NCSC's Cyber Essentials standard requires that organisations remove or disable permissive firewall rules quickly, when they are no longer needed. Permissive firewall rules must only be used when authorised for special purposes.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Firewalls",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 7,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Configuration",
        },
        {
          id: "SAQ86",
          title:
            "Do relevant end user devices have host-based firewalls installed, and are they configured and enabled for all use outside trusted networks?",
          guidance:
            "Ensure that the host based firewall is configured and enabled when a laptop is used outside of the trusted office network. Both Windows and OSX have built in firewalls available.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Firewalls",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 7,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Configuration",
        },
        {
          id: "SAQ87",
          title:
            "Is all relevant installed software fully licensed, supported, and from trusted sources?",
          guidance:
            "Vulnerabilities in unsupported software will never get fixed. Unlicensed software may be pirated or from other untrustworthy sources, and may contain malware or undesirable functionality.\n\nhttps://www.ncsc.gov.uk/guidance/keeping-your-smartphones-and-tablets-safe,The NCSC's Small Business Guide: Keeping Your Smartphones (and Tablets) Safe\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Malware Protection\nhttps://www.ncsc.gov.uk/guidance/10-steps-secure-configuration,\nThe NCSC's 10 Steps to Cyber Security: Secure Configuration\nThe NCSC and ICO's GDPR Security Outcomes guidance https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,B4",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 7,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Configuration",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ100",
              },
            },
          ],
        },
        {
          id: "SAQ98",
          title:
            "Is anti-malware software active and installed on all appropriate end-user devices and servers, with signature files regularly updated?",
          guidance:
            "Antivirus or other anti-malware solution should be installed on all appropriate devices, and should support emergency updates. (Mobile phones may be an exception because of the limited processing power of these devices).\n\nhttps://www.ncsc.gov.uk/guidance/protecting-your-organisation-malware,The NCSC's Small Business Guide: Protecting Your Organisation From Malware\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Malware Protection\nhttps://www.ncsc.gov.uk/guidance/10-steps-malware-prevention,The NCSC's 10 Steps to Cyber Security: Malware Prevention\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B4.c",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes - updated at least daily",
              value: "yesUpdatedAtLeastDaily",
              minimumRequired: true,
              points: 5,
            },
            {
              name: "Yes - managed and updated hourly and emergency updates",
              value: "yesManagedAndUpdatedHourlyAndEmergencyUpdates",
              points: 14,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Management",
        },
        {
          id: "SAQ99",
          title:
            "Is anti-malware software configured to scan files from ALL sources automatically when they are read?",
          guidance:
            "All files should be scanned on read and execute, no matter where they are from. This includes, but is not limited to, files downloaded from the Internet, usb devices, network storage, etc.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Malware Protection\nhttps://www.ncsc.gov.uk/guidance/10-steps-malware-prevention,The NCSC's 10 Steps to Cyber Security: Malware Prevention\nhttps://www.ncsc.gov.uk/guidance/10-steps-removable-media-controls,The NCSC’s 10 Steps to Cyber Security: Removable Media Controls\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B4.c",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 6,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Management",
        },
        {
          id: "SAQ100",
          title:
            "Are emails scanned for malicious content, including malware and phishing and scam messages?",
          guidance:
            "Malware checking solutions and additional controls that may be available should be deployed to examine both inbound and outbound data at the perimeter in addition to protection deployed internally. Examples include gateway scanning, webmail scanning, email client software scanning, etc.\n\nhttps://www.ncsc.gov.uk/guidance/10-steps-network-security,The NCSC's 10 Steps to Cyber Security: Network Security\nhttps://www.ncsc.gov.uk/guidance/10-steps-malware-prevention,The NCSC’s 10 Steps to Cyber Security: Malware Prevention\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B4.a&c",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 6,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Management",
        },
        {
          id: "SAQ101",
          title:
            "Which of the following controls are used to protect against malware on relevant systems? Tick all that apply.",
          guidance: "",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "Basic Antivirus software or Application sandboxing",
              value: "basicAntivirusSoftwareOrApplicationSandboxing",
              minimumRequired: true,
              points: 3,
            },
            {
              name: "Endpoint Detection and Response (EDR)",
              value: "endpointDetectionAndResponseEdr",
              points: 12,
            },
            {
              name: "Extended Detection and Response (XDR)",
              value: "extendedDetectionAndResponseXdr",
              points: 35,
            },
            {
              name: "Application whitelisting",
              value: "applicationWhitelisting",
              points: 35,
            },
            {
              name: "None of the above",
              value: "noneOfTheAbove",
              points: 0,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Management",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ104",
              },
            },
          ],
        },
        {
          id: "SAQ102",
          title:
            "Is anti-malware software configured to scan web pages automatically when they are accessed through a web browser (whether by other software or by the browser itself)?",
          guidance:
            "The NCSC's Cyber Essentials standard requires that, if anti-malware software is used (one of three permitted malware protection mechanisms), web pages are scanned automatically when they are accessed through a web browser (whether by other software or by the browser itself).\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Malware Protection\nhttps://www.ncsc.gov.uk/guidance/10-steps-network-security,The NCSC's 10 Steps to Cyber Security: Network Security\nhttps://www.ncsc.gov.uk/guidance/10-steps-malware-prevention,The NCSC’s 10 Steps to Cyber Security: Malware Prevention\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B4.a&c",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 6,
            },
            {
              name: "Internet browsing is not available to users of the service",
              value: "internetBrowsingIsNotAvailableToUsersOfTheService",
              points: 8,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Management",
        },
        {
          id: "SAQ103",
          title:
            "Is web browsing filtered to prevent connections to known malicious or inappropriate websites and content?",
          guidance:
            "The NCSC's Cyber Essentials standard requires that, if anti-malware software is used (one of three permitted malware protection mechanisms), it must prevent connections to malicious websites on the Internet (by means of blacklisting, for example). Any exceptions must be for a clear, documented business need.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Malware Protection\nhttps://www.ncsc.gov.uk/guidance/10-steps-network-security,The NCSC's 10 Steps to Cyber Security: Network Security\nhttps://www.ncsc.gov.uk/guidance/10-steps-malware-prevention,The NCSC’s 10 Steps to Cyber Security: Malware Prevention\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B4.a&c",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 6,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Management",
        },
        {
          id: "SAQ104",
          title:
            "Are applications that are permitted to be present and active on relevant computer systems whitelisted?",
          guidance:
            "The NCSC's Cyber Essentials standard requires that, if application whitelisting is used (one of three permitted malware protection mechanisms), it must ensure that only approved applications, restricted by code signing, are allowed to execute on devices. The Applicant must: actively approve such applications before deploying them to devices, and maintain a current list of approved applications.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Malware Protection\nhttps://www.ncsc.gov.uk/guidance/10-steps-secure-configuration,The NCSC's 10 Steps to Cyber Security: Secure Configuration",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 6,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Management",
        },
        {
          id: "SAQ105",
          title:
            "Are applications and scripts required to be digitally signed by the author before they are able to run on relevant computer systems?",
          guidance:
            "The NCSC's Cyber Essentials standard requires that, if application whitelisting is used (one of three permitted malware protection mechanisms), it must ensure that users cannot install any application that is unsigned or has an invalid signature.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Malware Protection",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 6,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Management",
        },
        {
          id: "SAQ106",
          title:
            "Is any code of unknown origin run in a sandbox to prevent access to other relevant resources, unless permission is explicitly granted by the user?",
          guidance:
            "The NCSC's Cyber Essentials standard requires that, if application sandboxing is used (one of three permitted malware protection mechanisms), it must ensure that all code of unknown origin is run within a ‘sandbox’ that prevents access to other resources unless permission is explicitly granted by the user. This includes other sandboxed applications, data stores (such as those holding documents and photos), sensitive peripherals (such as the camera, microphone and GPS) and local network access. This is particularly relevant to smartphones.\n\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Malware Protection",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 6,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Secure Management",
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "SKIP",
              target: {
                type: "QUESTION",
                value: "SAQ132",
              },
            },
          ],
        },
        {
          id: "SAQ109",
          title:
            "Are all relevant devices, servers, and appliances kept up to date (or ‘patched’) within timescales that are appropriate to risks?",
          guidance:
            "Patching and security updates of all hardware and software is a fundamental step towards ensuring systems cannot be hacked. The NCSC's Cyber Essentials standard requires that software must be patched within 14 days of an update being released, where the patch fixes a vulnerability with a severity the product vendor describes as \"critical\" or \"high risk\".\n\nhttps://www.ncsc.gov.uk/guidance/protecting-your-organisation-malware,The NCSC's Small Business Guide: Protecting Your Organisation From Malware\nhttps://www.ncsc.gov.uk/guidance/keeping-your-smartphones-and-tablets-safe,The NCSC’s Small Business Guide: Keeping Your Smartphones and Tablets Safe\nhttps://www.cyberessentials.ncsc.gov.uk/advice/,The NCSC's Cyber Essentials Standard: Patch Management\nhttps://www.ncsc.gov.uk/guidance/10-steps-secure-configuration,The NCSC's 10 Steps to Cyber Security: Secure Configuration\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B4.d\nThe NCSC and ICO's GDPR Security Outcomes guidance https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,A4 and B4\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-5-operational-security,The NCSC's Cloud Security Principles: Principle 5: Operational Security",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "Patches are applied only on an Ad hoc basis",
              value: "patchesAreAppliedOnlyOnAnAdHocBasis",
              points: 0,
            },
            {
              name: "Patches are only applied as part of the supplier's update roadmap",
              value: "patchesAreOnlyAppliedAsPartOfTheSuppliersUpdateRoadmap",
              minimumRequired: true,
              points: 35,
            },
            {
              name: "Full and timely patching regime",
              value: "fullAndTimelyPatchingRegime",
              points: 55,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Vulnerability Management",
        },
        {
          id: "SAQ115",
          title:
            "Are data backups taken regularly and secured in accordance with a backup policy?",
          guidance:
            "Backups should be taken on a regular basis and protected appropriately (e.g. through encryption, offsite storage, physical controls) to ensure that in the event of a system failure important data can be restored.\n\nhttps://www.ncsc.gov.uk/guidance/backing-your-data,The NCSC's Small Business Guide: Backing up your data\nhttps://www.ncsc.gov.uk/guidance/10-steps-incident-management,The NCSC's 10 Steps to Cyber Security: Incident Management\nhttps://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B3.c and B5.c\nhttps://www.ncsc.gov.uk/guidance/caf-objective-d,The NCSC's NIS Cyber Assessment Framework: D1.b\nhttps://www.ncsc.gov.uk/guidance/gdpr-security-outcomes ,The NCSC and ICO's GDPR Security Outcomes guidance B3 and D1",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "Backups are taken on an ad hoc basis",
              value: "backupsAreTakenOnAnAdHocBasis",
              points: 0,
            },
            {
              name: "Scheduled backups",
              value: "scheduledBackups",
              minimumRequired: true,
              points: 38,
            },
            {
              name: "Scheduled encrypted and stored offsite",
              value: "scheduledEncryptedAndStoredOffsite",
              points: 58,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Resilient Networks and Systems",
        },
        {
          id: "SAQ116",
          title:
            "Are management, staff, and contractors provided with relevant information security education and awareness training?",
          guidance:
            "Users have a critical role to play in their organisation’s security. Organisation should promote a culture of information security. Examples of good practice include appropriate induction training, acceptable use policies, disciplinary process, regular guidance and awareness raising, promotion of a no-blame incident reporting culture.\n\nhttps://www.ncsc.gov.uk/guidance/10-steps-user-education-and-awareness,The NCSC's 10 Steps to Cyber Security: User Education and Awareness<br/> https://www.ncsc.gov.uk/guidance/caf-objective-b,The NCSC's NIS Cyber Assessment Framework: B6.a and b<br/> https://www.ncsc.gov.uk/guidance/gdpr-security-outcomes,The NCSC and ICO's GDPR Security Outcomes guidance B5",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Staff only",
              value: "staffOnly",
              minimumRequired: true,
              points: 15,
            },
            {
              name: "Staff and all relevant contractors",
              value: "staffAndAllRelevantContractors",
              points: 25,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Staff Awareness and Training",
        },
        {
          id: "SAQ120",
          title:
            "Are management, staff, and contractors required to secure unattended equipment?",
          guidance:
            "There should be clear requirements in place to help prevent sensitive data being accessed inappropriately as a result of, e.g. device theft or unauthorised use. Examples of good practice include requirements for laptops to be secured to tables with cable and lock, or locked away when not in use, and screen locks being applied by staff when they are away from their devices.",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 24,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Staff Awareness and Training",
        },
        {
          id: "SAQ121",
          title:
            "Are relevant devices configured to lock automatically after a period of inactivity?",
          guidance:
            "Screen locks or automatic logouts after a timeout period can help prevent illicit access to data when staff are away from their devices.",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes, guidance only",
              value: "yesGuidanceOnly",
              minimumRequired: true,
              points: 8,
            },
            {
              name: "Yes, and a technical timeout of 15 minutes or less is enforced",
              value: "yesAndATechnicalTimeoutOf15MinutesOrLessIsEnforced",
              points: 19,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Staff Awareness and Training",
        },
        {
          id: "SAQ122",
          title:
            "Are all users instructed to ensure that devices and paperwork are protected to ensure work can not be overlooked by unauthorised users, including family members when working from home?",
          guidance:
            "Screens should not be visible to unauthorised users and a privacy screen employed where required.  Documents should not be left unattended on desktops.  Computer work accounts should not be used by anyone else, including family members.",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 10,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          subsection: "Staff Awareness and Training",
        },
      ],
    },
    {
      name: "Minimising the Impact of Security Incidents",
      questions: [
        {
          id: "SAQ131",
          title:
            "Are there incident management policies and procedures to manage information security events and alerts?",
          guidance:
            "There should be policy and procedures to manage (report, assess, respond to and learn from) information security events, incidents and weaknesses consistently and effectively. These should identify such things as incident response planning, logging, response and escalation responsibilities, lessons learned, etc.\n\nhttps://www.ncsc.gov.uk/guidance/10-steps-incident-management,The NCSC's 10 Steps to Cyber Security: Incident Management\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-5-operational-security,The NCSC's Cloud Security Principles: Principle 5: Operational Security",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 10,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
        },
        {
          id: "SAQ132",
          title:
            "Have incident management roles and responsibilities been defined?",
          guidance:
            "Organisations should appoint and empower specific individuals (or suppliers) to handle incidents and provide them with clear terms of reference to make decisions and manage any incident that may occur. Ensure that the contact details of key personnel are readily available to use in the event of an incident.\n\nhttps://www.ncsc.gov.uk/guidance/10-steps-incident-management,The NCSC's 10 Steps to Cyber Security: Incident Management",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 10,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
        },
        {
          id: "SAQ133",
          title:
            "Are policies and procedures in place to ensure that all relevant security incidents are reported to the contracting authority in an acceptable time frame?",
          guidance:
            "Organisations should have policies and procedures in place to ensure that relevant security incidents are reported in acceptable timescales and formats.\n\nhttps://www.ncsc.gov.uk/guidance/cloud-security-principle-5-operational-security,The NCSC's Cloud Security Principles: Principle 5: Operational Security",
          type: "MULTIPLE_CHOICE",
          options: [
            {
              name: "No",
              value: "no",
              points: 0,
            },
            {
              name: "Yes",
              value: "yes",
              minimumRequired: true,
              points: 25,
            },
            {
              name: "Not applicable",
              value: "n/a",
              freeText: true,
              freeTextLabel: "Please provide an explanation if not applicable",
              points: 0,
            },
          ],
          logic: [
            {
              condition: [
                {
                  questionId: "SAQ000-02",
                  op: "INCLUDES",
                  value: ["iso27001"],
                },
              ],
              action: "END",
              target: {
                type: "OUTCOME",
                value: "COMPLETE",
              },
            },
          ],
        },
      ],
    },
  ],
};

export const mockAnswers = {
  SAQ4: { answer: [{ value: "n/a", freeText: "No idea" }] },
  SAQ8: { answer: [{ value: "yes" }] },
  SAQ11: { answer: [{ value: "eea" }] },
  SAQ15: { answer: [{ value: "yes" }] },
  SAQ34: { answer: [{ value: "yes" }] },
  SAQ38: { answer: [{ value: "requiredForAllUsers" }] },
  "SAQ000-01": { answer: [{ value: "no" }] },
};

export const mockFormattedAnswers = {
  Certification: [
    {
      question: "Do you have any Information Security Certification?",
      id: "SAQ000-01",
      answers: [
        {
          value: "no",
          label: "No",
        },
      ],
    },
  ],
  "Managing Security Risk": [
    {
      question:
        "Have appropriate information security roles and responsibilities been defined and allocated?",
      id: "SAQ2",
      answers: [
        {
          value:
            "noResponsibilityForInformationSecurityHasNotBeenFormallyAssigned",
          label:
            "No - Responsibility for information security has not been formally assigned",
        },
      ],
    },
    {
      question:
        "Are there arrangements for reporting significant cyber security incidents to external authorities?",
      id: "SAQ4",
      answers: [
        {
          value: "n/a",
          label: "Not applicable",
        },
      ],
    },
    {
      question:
        "Is there a risk management regime which assesses the risks to relevant information and systems?",
      id: "SAQ6",
      answers: [
        {
          value: "ictRiskAssessmentAndManagementProcessesAreDoneOnAnAdHocBasis",
          label:
            "ICT risk assessment and management processes are done on an ad hoc basis",
        },
      ],
    },
    {
      question:
        "Do senior management review the effectiveness of the information security programme on a regular basis?",
      id: "SAQ8",
      answers: [
        {
          value: "yes",
          label: "Yes",
        },
      ],
    },
    {
      question:
        "In which countries or regions will data or information be processed?",
      id: "SAQ11",
      answers: [
        {
          value: "eea",
          label: "EEA",
        },
      ],
    },
    {
      question:
        "Are proportionate measures in place to ensure that storage media containing  relevant data are not compromised?",
      id: "SAQ15",
      answers: [
        {
          value: "yes",
          label: "Yes",
        },
      ],
    },
    {
      question:
        "Are there appropriate policies and /or procedures in place to govern the storage and transfer of information using personal electronic devices and removable media?",
      id: "SAQ16",
      answers: [
        {
          value: "yes",
          label: "Yes",
        },
      ],
    },
    {
      question:
        "Are personal electronic devices such as smartphones, laptops and tablets configured to security best practices?",
      id: "SAQ17",
      answers: [
        {
          value: "yes",
          label: "Yes",
        },
      ],
    },
    {
      question:
        "Are appropriate screening checks performed to confirm the identity and trustworthiness of all relevant supplier and/or contractor staff, that may have access to public sector information, prior to their engagement?",
      id: "SAQ25",
      answers: [
        {
          value: "yes",
          label: "Yes",
        },
      ],
    },
  ],
  "Protecting from Cyber Attack & Identity and Access Management": [
    {
      question:
        "Are all users asked to authenticate appropriately before they can access relevant applications, devices, and management interfaces?",
      id: "SAQ29",
      answers: [
        {
          value: "yes",
          label: "Yes",
        },
      ],
    },
    {
      question:
        "Are users only granted the level of access to information and systems that they require to perform their role?",
      id: "SAQ34",
      answers: [
        {
          value: "yes",
          label: "Yes",
        },
      ],
    },
    {
      question:
        "Is multi-factor authentication implemented to authenticate users?",
      id: "SAQ38",
      answers: [
        {
          value: "requiredForAllUsers",
          label: "Required for all users",
        },
      ],
    },
  ],
};
