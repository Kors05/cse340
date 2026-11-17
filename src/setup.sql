-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Project Table
-- ========================================
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- ========================================
-- Category Table
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE
);

-- ========================================
-- Project-Category Junction Table
-- ========================================
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES project(project_id),

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);

-- ========================================
-- Insert Sample Organization Data
-- ========================================

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);


-- ========================================
-- Insert Sample Project Data
-- ========================================

INSERT INTO project (organization_id, name, description)
VALUES
(
    (SELECT organization_id FROM organization
     WHERE name = 'BrightFuture Builders'),
    'Community Housing Renovation',
    'Renovating homes and community facilities for families in need.'
),
(
    (SELECT organization_id FROM organization
     WHERE name = 'GreenHarvest Growers'),
    'Urban Community Garden',
    'Creating sustainable gardens and teaching urban farming skills.'
),
(
    (SELECT organization_id FROM organization
     WHERE name = 'UnityServe Volunteers'),
    'Community Food Drive',
    'Collecting and distributing food supplies to vulnerable families.'
);



-- ========================================
-- Insert Sample Category Data
-- ========================================

INSERT INTO category (name)
VALUES
    ('Community Development'),
    ('Environmental Sustainability'),
    ('Food Assistance');


-- ========================================
-- Associate Projects with Categories
-- ========================================

INSERT INTO project_category (project_id, category_id)
VALUES
(
    (SELECT project_id FROM project
     WHERE name = 'Community Housing Renovation'),
    (SELECT category_id FROM category
     WHERE name = 'Community Development')
),
(
    (SELECT project_id FROM project
     WHERE name = 'Urban Community Garden'),
    (SELECT category_id FROM category
     WHERE name = 'Environmental Sustainability')
),
(
    (SELECT project_id FROM project
     WHERE name = 'Community Food Drive'),
    (SELECT category_id FROM category
     WHERE name = 'Food Assistance')
);
