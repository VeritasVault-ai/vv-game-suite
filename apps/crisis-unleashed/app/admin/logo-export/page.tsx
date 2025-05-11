"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// Import directly from component files instead of barrel file
import LogoSystem from "@/components/logo-system/logo-system"
import type { LogoVariant, LogoSize } from "@/components/logo-system/logo-variant"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Download, Copy, Check } from "lucide-react"

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

/****
 * Renders a page for customizing, previewing, and exporting logos with various settings.
 *
 * Provides controls to select logo faction, variant, size, and style options, as well as export format and dimensions. Displays a live preview and generates a JSX code snippet for the configured logo, which can be copied to the clipboard. Export functionality is currently limited to a placeholder alert.
 */
export default function LogoExportPage() {
  const [selectedFaction, setSelectedFaction] = useState<string>("cybernetic-nexus")
  const [selectedVariant, setSelectedVariant] = useState<LogoVariant>("standard")
  const [selectedSize, setSelectedSize] = useState<LogoSize>("lg")
  const [monochrome, setMonochrome] = useState<boolean>(false)
  const [inverted, setInverted] = useState<boolean>(false)
  const [withTagline, setWithTagline] = useState<boolean>(false)
  const [exportFormat, setExportFormat] = useState<string>("svg")
  const [exportWidth, setExportWidth] = useState<number>(300)
  const [exportHeight, setExportHeight] = useState<number>(100)
  const [copied, setCopied] = useState<boolean>(false)

  const logoRef = useRef<HTMLDivElement>(null)

  const handleExport = () => {
    // In a real implementation, this would convert the logo to the selected format
    // and trigger a download. For now, we'll just show an alert.
    alert(`Exporting logo as ${exportFormat} with dimensions ${exportWidth}x${exportHeight}`)
  }

  const handleCopyCode = () => {
    const code = `<LogoSystem
  variant="${selectedVariant}"
  size="${selectedSize}"
  faction="${selectedFaction}"
  ${monochrome ? "monochrome" : ""}
  ${inverted ? "inverted" : ""}
  ${withTagline ? "withTagline" : ""}
/>`

    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Logo Export Tool</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo Settings</CardTitle>
              <CardDescription>Customize the logo for export</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="variant">Variant</Label>
                <Select value={selectedVariant} onValueChange={(value) => setSelectedVariant(value as LogoVariant)}>
                  <SelectTrigger id="variant">
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {variants.map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select value={selectedSize} onValueChange={(value) => setSelectedSize(value as LogoSize)}>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
              <CardDescription>Configure export parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="svg">SVG (Vector)</SelectItem>
                    <SelectItem value="png">PNG (Transparent)</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={exportWidth}
                    onChange={(e) => setExportWidth(Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={exportHeight}
                    onChange={(e) => setExportHeight(Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <Button className="w-full" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Logo
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Live preview of your logo</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList className="mb-6">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="h-[400px]">
                  <div
                    ref={logoRef}
                    className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md p-8"
                  >
                    <LogoSystem
                      variant={selectedVariant}
                      size={selectedSize}
                      faction={selectedFaction}
                      monochrome={monochrome}
                      inverted={inverted}
                      withTagline={withTagline}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="code">
                  <div className="relative">
                    <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                      <code>{`<LogoSystem
  variant="${selectedVariant}"
  size="${selectedSize}"
  faction="${selectedFaction}"
  ${monochrome ? "monochrome" : ""}
  ${inverted ? "inverted" : ""}
  ${withTagline ? "withTagline" : ""}
/>`}</code>
                    </pre>
                    <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={handleCopyCode}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}