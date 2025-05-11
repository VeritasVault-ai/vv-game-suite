"use client"

import { useState } from "react"
// Import directly from component files instead of barrel file
import LogoSystem from "@/components/logo-system/logo-system"
import type { LogoVariant, LogoSize } from "@/components/logo-system/logo-variant"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import LogoUsageGuide from "@/components/logo-system/logo-usage-guide"

const factions = [
  "cybernetic-nexus",
  "primordial-ascendancy",
  "void-harbingers",
  "eclipsed-order",
  "titanborn",
  "celestial-dominion",
]

const variants: LogoVariant[] = [
  "standard",
  "compact",
  "horizontal",
  "vertical",
  "icon-only",
  "text-only",
  "footer",
  "mobile",
  "print",
  "watermark",
]

const sizes: LogoSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"]

/**
 * Renders an interactive page for previewing, customizing, and comparing all logo variants, sizes, and factions with live theme toggling and usage guidelines.
 *
 * The interface allows users to select a faction, toggle logo properties (animation, interactivity, monochrome, inverted colors, tagline), and switch between light and dark themes. Tabs provide views for all logo variants, size comparisons, faction comparisons, and detailed usage guidelines.
 */
export default function LogoVariantsPage() {
  const { theme, setTheme } = useTheme()
  const [selectedFaction, setSelectedFaction] = useState<string>("cybernetic-nexus")
  const [animated, setAnimated] = useState<boolean>(true)
  const [interactive, setInteractive] = useState<boolean>(false)
  const [monochrome, setMonochrome] = useState<boolean>(false)
  const [inverted, setInverted] = useState<boolean>(false)
  const [withTagline, setWithTagline] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("all")

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Logo Variants</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Logo Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="faction">Faction</Label>
              <Select value={selectedFaction} onValueChange={setSelectedFaction}>
                <SelectTrigger id="faction">
                  <SelectValue placeholder="Select faction" />
                </SelectTrigger>
                <SelectContent>
                  {factions.map((faction) => (
                    <SelectItem key={faction} value={faction}>
                      {faction
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="animated" checked={animated} onCheckedChange={setAnimated} />
              <Label htmlFor="animated">Animated</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="interactive" checked={interactive} onCheckedChange={setInteractive} />
              <Label htmlFor="interactive">Interactive</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="monochrome" checked={monochrome} onCheckedChange={setMonochrome} />
              <Label htmlFor="monochrome">Monochrome</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="inverted" checked={inverted} onCheckedChange={setInverted} />
              <Label htmlFor="inverted">Inverted</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="withTagline" checked={withTagline} onCheckedChange={setWithTagline} />
              <Label htmlFor="withTagline">With Tagline</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                Toggle Theme ({theme})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Variants</TabsTrigger>
          <TabsTrigger value="sizes">Size Comparison</TabsTrigger>
          <TabsTrigger value="factions">Faction Comparison</TabsTrigger>
          <TabsTrigger value="usage">Usage Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {variants.map((variant) => (
              <Card key={variant}>
                <CardHeader>
                  <CardTitle className="capitalize">{variant} Logo</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center min-h-[150px] bg-muted/20 rounded-md">
                  <LogoSystem
                    variant={variant}
                    size="lg"
                    faction={selectedFaction}
                    animated={animated}
                    interactive={interactive}
                    monochrome={monochrome}
                    inverted={inverted}
                    withTagline={withTagline}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sizes">
          <Card>
            <CardHeader>
              <CardTitle>Size Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <div className="w-20 text-sm font-medium">{size}:</div>
                    <LogoSystem
                      size={size}
                      faction={selectedFaction}
                      animated={animated}
                      interactive={interactive}
                      monochrome={monochrome}
                      inverted={inverted}
                      withTagline={withTagline}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factions.map((faction) => (
              <Card key={faction}>
                <CardHeader>
                  <CardTitle className="capitalize">
                    {faction
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center min-h-[150px] bg-muted/20 rounded-md">
                  <LogoSystem
                    size="lg"
                    faction={faction}
                    animated={animated}
                    interactive={interactive}
                    monochrome={monochrome}
                    inverted={inverted}
                    withTagline={withTagline}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <LogoUsageGuide />
        </TabsContent>
      </Tabs>
    </div>
  )
}