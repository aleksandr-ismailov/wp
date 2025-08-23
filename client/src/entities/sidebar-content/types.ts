export interface SidebarContent {
	content: string;
}

export interface SidebarsResponse {
	leftSidebar: SidebarContent;
	rightSidebar: SidebarContent;
}

export interface SidebarsApiResponse {
	success: boolean;
	data: SidebarsResponse;
}

export interface SiteBranding {
	logoUrl: string | null;
	copyrightText: string;
	authorName: string;
}

export interface SiteBrandingApiResponse {
	success: boolean;
	data: SiteBranding;
}
